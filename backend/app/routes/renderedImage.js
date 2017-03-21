var express = require('express');
var multiparty = require('multiparty');
var AWS = require('aws-sdk');

var s3 = require('../config/aws').s3;
var User = require('../models/user');
var Project = require('../models/project');
var RenderedImage = require('../models/renderedImage');

var router = express.Router({mergeParams: true});


// get all rendered images for the user
// !!! TODO: need to restrict the access of this project for other users
router.get('/', function(req, res) {
  Project.findOne({
    _id: req.params.project_id
  }, function(err, project) {
    if (!project){
      res.json({ success: false, message: 'no project was found with the given id.'});
    } else{
      res.json({ success: true, message: 'rendered images found', renderedImages: project.renderedImages});
    }
  });
});

router.get('/:rendered_id', function(req, res) {
  RenderedImage.findOne({
    _id: req.params.rendered_id
  }, function(err, renderedImage) {
    if (!renderedImage){
      res.json({ success: false, message: 'no custom image was found with the given id.'});
    } else{
      // get object and pipe it to the client
      s3.getObject({
        Bucket: s3['bucketName']+'/renderedImages',
        Key: renderedImage.id
      }, function(err, data){
        if (err) console.log(err, err.stack); // an error occurred
        else {
          var stream = AWS.util.buffer.toStream(data.Body);
          stream.pipe(res);
        }
      });
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
                newRenderedImage.eTag = data.ETag;
                newRenderedImage.save(function(err) {
                if (err) throw err;
            });

          // add new to the project and save
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
