var express = require('express');
var router = express.Router();

router.get('/login', function(req, res) {
  res.send("user may provide id/pw to get a signed token");
});

router.get('/validate', function(req, res) {
  res.send("validates if the user submitted token is valid");
});

router.get('/signup', function(req, res) {
  res.send("allows user to sign up");
});

module.exports = router;
