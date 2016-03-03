var express = require('express');
var passport = require('passport');
//var User = require('../models/user');
var router = express.Router();

router.get('/', function (req, res) {
    res.send("Labcoop Homework is running!");
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router;
