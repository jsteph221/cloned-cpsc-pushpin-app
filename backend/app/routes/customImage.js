var express = require('express');
var fs = require('fs');
var multiparty = require('multiparty');
var s3 = require('../config/aws').s3;

var User = require('../models/user');
var Project = require('../models/project');
var CustomImage = require('../models/customImage');

var router = express.Router({mergeParams: true});


// get all custom images for the user
router.get('/', function(req, res) {
  Project.findOne({
    _id: req.params.project_id
  }, function(err, project) {
    if (!project){
      res.json({ success: false, message: 'no project was found with the given id.'});
    } else{
      res.json({ success: true, message: 'custom images found', customImages: project.customImages});
    }
  });
});


// upload an user submitted image to S3
router.post('/', function(req, res) {
  Project.findOne({
    _id: req.params.project_id
  }, function(err, project) {
    if (!project){
      res.json({ success: false, message: 'no project was found with the given id.'});
    } else{
      // create a custom image doc 
      var newCustomImage = new CustomImage();
      newCustomImage.save(function(err) {
        if (err) throw err;
      });

      // parse multi-part/form-data
      var form = new multiparty.Form();
      form.on('field', function(name, value) {
        if (name === 'path') {
          destPath = value;
        }
      });
      form.on('part', function(part) {
        s3.putObject({
          Bucket: s3['bucketName']+'/customImages',
          Key: newCustomImage.id,
          ACL: 'public-read-write',
          Body: part,
          ContentLength: part.byteCount,
        }, function(err, data) {
          if (err) throw err;
          // console.log("done", data); // eTag
          res.end("OK");
        });
      });
      form.parse(req);

      // add new customImage to the project
      project.customImages.push(newCustomImage);
      project.save(function(err) {
        if (err) throw err;
      });

      res.json({ success: true, message: 'custom images created', customImages: newCustomImage});
    }
  });
});


// get project(id)
router.get('/:custom_id', function(req, res) {
  CustomImage.findOne({
    _id: req.params.custom_id
  }, function(err, customImage) {
    if (!customImage){
      res.json({ success: false, message: 'no custom image was found with the given id.'});
    } else{
      res.json({ success: true, message: 'custom image found', customImage: customImage});
    }
  });
}); 

module.exports = router;
