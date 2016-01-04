var express = require('express');
var router = express.Router();
var Account = require('../models/account');

// get home page
router.get('/', function (req, res) {
    res.render('index', { user : req.user, title: 'Authentication Template', active: 'home' });
});

// get user list page
router.get('/users', function (req, res) {
    res.render('users', { user : req.user, active: 'users' });
});

// run test
router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router;
