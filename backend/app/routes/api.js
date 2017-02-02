var express = require('express');
var jwt    = require('jsonwebtoken');
var User = require('../models/user');


var router = express.Router();


// Create a sample user
router.get('/setup', function(req, res) {
  var name = 'Test';
  var password = 'password';

  var testUser = new User({ 
    name: name, 
    password: password
  });

  testUser.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true , name: name, password: password});
  });
});


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

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, req.app.get('token_secret'), {
          expiresIn : 60*60*24 // expires in 24 hours
        });

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
   // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    // create an user
    if (!user) {
      var testUser = new User({ 
        name: req.body.name, 
        password: req.body.password
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
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

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
  res.send("This is the root url of API router");
});


// Get all users
router.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
}); 


module.exports = router;
