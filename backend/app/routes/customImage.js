var express = require('express');

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
