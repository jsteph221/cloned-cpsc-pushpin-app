var express = require('express');
var jwt    = require('jsonwebtoken');
var projectRouter = require('./project');
var customImageRouter = require('./customImage');
var standardImageRouter = require('./standardImage');
var renderedImageRouter = require('./renderedImage');

var User = require('../models/user');
var Project = require('../models/project');


var router = express.Router();


// User Authentication
router.post('/authenticate', function(req, res) {
   // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        // create a token
        var token = jwt.sign(user, req.app.get('token_secret'), {
          expiresIn : 60*60*24 // expires in 24 hours
        });

        var time = 60*60*24*1000;

        res.cookie('token', token, {maxAge: time, httpOnly:true});

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'This token expires in 24 hours',
          token: token
        });
      }
    }
  });
});


// User Signup
router.post('/signup', function(req, res) {
  // verify empty inputs
  if (req.body.name == ""){
    res.json({ success: false, message: 'Empty username is not allowed' });
    return;
  } 

  if (req.body.password == ""){
    res.json({ success: false, message: 'Empty password is not allowed' });
    return;
  }

  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      // create a project doc
      var initialProject = new Project({
        name: 'initial project'
      })
      initialProject.save(function(err) {
        if (err) throw err;
      })

      // create an user
      var testUser = new User({
        name: req.body.name, 
        password: req.body.password,
        projects: [initialProject]
      });
      testUser.save(function(err) {
        if (err) throw err;
        console.log('User saved successfully');
        res.json({ success: true , message: 'User account has been created.'});
      });

    } else if (user) {
      res.json({ success: false, message: 'This user name is already being used.' });
    }
  });
});


// Middleware validating token
router.use(function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;

  // verifies secret and checks exp
  if (token) {
    jwt.verify(token, req.app.get('token_secret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});


router.get('/', function(req, res) {
  res.json({ success: true, message: 'The user is logged in, and the token is valid.' }); 
});

router.use('/projects', projectRouter);
router.use('/projects/:project_id/customImages', customImageRouter);
router.use('/projects/:project_id/renderedImages',renderedImageRouter);
router.use('/standard', standardImageRouter);

module.exports = router;
