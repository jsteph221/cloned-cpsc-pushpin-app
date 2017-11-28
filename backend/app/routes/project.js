var express = require('express');
var customImageRouter = require('./customImage');

var User = require('../models/user');
var Project = require('../models/project');
var CustomImage = require('../models/customImage');


var router = express.Router();

// get all projects for the user
router.get('/', function(req, res) {
  console.log(req.decoded._doc);
  var user = req.decoded._doc;
  var projects = user.projects;
  res.json({ success: true, projects: projects});
});

// get project(id)
// !!! TODO: need to restrict the access of this project for other users
router.get('/:project_id', function(req, res) {
  Project.findOne({
    _id: req.params.project_id
  }, function(err, project) {
    if (!project){
      res.json({ success: false, message: 'no project was found with the given id.'});
    } else{
      res.json({ success: true, message: 'project was successfully found', project: project});
    }
  });
});

module.exports = router;
