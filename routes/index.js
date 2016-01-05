var express = require('express');
var router = express.Router();
var Account = require('../models/account');

// get home page
router.get('/', function (req, res) {
  res.render('index', { user : req.user, title: 'Authentication Template', description: 'A simple template for use with express.js and mongoose.js. Made with bootstrap.css', active: 'home' });
});

// get user list page
router.get('/users', function (req, res) {
  Account.find({}, function (err, accounts) {
    if (err) return next(err);
    res.render('users', { user : req.user, account: accounts, active: 'users' });
  });
});

// get individual user
router.get('/user/:id', function (req, res) {
  Account.findOne({ _id: req.params.id }, function (err, accounts) {
    if (err) return next(err);
    res.render('user', { user : req.user, account: accounts, active: 'users' });
  });
});

// run test
router.get('/ping', function(req, res){
  res.status(200).send("pong!");
});

module.exports = router;
