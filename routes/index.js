var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('index', { user : req.user, title: 'Authentication Template', active: 'home' });
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router;
