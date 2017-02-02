var express = require('express');
var User = require('../models/user');

var router = express.Router();

router.get('/', function(req, res) {
  res.send("This is the root url of API router");
});

// Create a sample user
router.get('/setup', function(req, res) {
  var nick = new User({ 
    name: 'Nick Cerminara', 
    password: 'password',
    admin: true 
  });

  nick.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});

// Get all users
router.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
}); 

// Authentication related router
router.use('/authenticate', require('./authenticate'));

module.exports = router;
