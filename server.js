var express = require('express')
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressSession = require('express-session');
var mongoose = require('mongoose');

//App
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSession({secret: 'super secret key'}));
app.use(passport.initialize());
app.use(passport.session());

//Passport config
//TODO: refactor into a separate file
var User = require('./models/User');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//MongoDB connect
var db = require('./config/db');
mongoose.connect(db.url);

var router = require('./routes/api');
app.use('/', router);

//Error handlers
app.use(function(req, res, next){
    res.status(404);
    console.log('Not found URL: %s',req.url);
    res.send({ error: 'Not found' });
    return;
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    console.log('Internal error(%d): %s',res.statusCode,err.message);
    res.send({ error: err.message });
    return;
});
//var users = require('./routes/users');

module.exports = app;

app.listen(1221, function(){
  console.log('Labcoop homework server is running on 1221');
});
