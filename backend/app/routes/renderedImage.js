var express = require('express');
var multiparty = require('multiparty');
var AWS = require('aws-sdk');

var s3 = require('../config/aws').s3;
var User = require('../models/user');
var Project = require('../models/project');
var RenderedImage = require('../models/renderedImage');

var router = express.Router({mergeParams: true});


// get all custom images for the user
// !!! TODO: need to restrict the access of this project for other users
router.get('/', function(req, res) {
    var urls = [];
    var query = Project.findOne({_id:req.params.project_id});    
    query.select('renderedImages');
    query.exec(function(err,imgs){
        if (err){
            res.json({ success: false, imgs:urls});
        }else{
            for(var i = 0; i< imgs.renderedImages.length;i++){
                var params = {Bucket:s3['bucketName'],Key:'renderedImages/'+imgs.renderedImages[i].toString(),Expires:7200};
                s3.getSignedUrl('getObject', params,function(err,url){
                    if (!err){
                        urls.push(url);  
                    }                         
                });
               
            }  
            console.log(urls);
            res.json({ success: true, imgs:urls});  
        }
        
    });
});


// upload an renderedCanvas to s3
// !!! TODO: need to restrict the access of this project for other users
router.post('/', function(req, res) {
  Project.findOne({
    _id: req.params.project_id
  }, function(err, project) {
    if (!project){
      res.json({ success: false, message: 'no project was found with the given id.'});
    } else{
      // create a custom image doc 
        var newRenderedImage = new RenderedImage();
        buf = new Buffer(req.body.image.replace(/^data:image\/\w+;base64,/,""), 'base64');
        // send image file
        console.log(newRenderedImage._id);
        var params = {Bucket:s3['bucketName']+'/renderedImages', Key: newRenderedImage.id,Body:buf, ContentEncoding: 'base64',ContentType:'image/png'};
        s3.putObject(params,          
            function(err, data) {
                if (err) throw err;

                // set attribute of the custom image and save
                newRenderedImage.eTag = data.ETag;
                newRenderedImage.save(function(err) {
                if (err) throw err;
            });

          // add new customImage to the project and save
          project.renderedImages.push(newRenderedImage);
          project.save(function(err) {
            if (err) throw err;
          });

          res.json({ success: true, message: 'rendered images created', renderedImage: newRenderedImage});
        });      

    }
  });
});



module.exports = router;
