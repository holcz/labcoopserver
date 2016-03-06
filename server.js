var express = require('express')
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var authController = require('./controllers/authentication');

//App config
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

//MongoDB
var db = require('./config/db');
mongoose.connect(db.url);

//TODO: implement it in a separate file: router or routes/api
var router = express.Router();
var mealController = require('./controllers/meal');
router.route('/meals')
  .post(authController.isAuthenticated, mealController.postMeal)
  .get(authController.isAuthenticated, mealController.getMeals);

router.route('/meals/:meal_id')
  .get(authController.isAuthenticated, mealController.getMeal)
  .put(authController.isAuthenticated, mealController.putMeal)
  .delete(authController.isAuthenticated, mealController.deleteMeal);

var userController = require('./controllers/user');
router.route('/user')
  .post(userController.postUser)
  .get(authController.isAuthenticated, userController.getUser)
  .put(authController.isAuthenticated,userController.putUser)
  .delete(authController.isAuthenticated,userController.deleteUser);

// router.route('/users/:username')
//   .get(authController.isAuthenticated,userController.getUser)
//   .put(authController.isAuthenticated,userController.putUser)
//   .delete(authController.isAuthenticated,userController.deleteUser);

// Register all our routes with /api
app.use('/api', router);

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

app.listen(1221, function(){
  console.log('Labcoop homework server is running on 1221');
});
