var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function(req, res) {
  res.send("This is the root url of API router");
});

router.get('/setup', function(req, res) {
  // create a sample user
  var nick = new User({ 
    name: 'Nick Cerminara', 
    password: 'password',
    admin: true 
  });

  // save the sample user
  nick.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});

router.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
}); 

module.exports = router;
