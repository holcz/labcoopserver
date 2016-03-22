var Meal = require('../models/meal');

// Create endpoint /api/meals for POSTS
exports.postMeal = function(req, res) {
  var meal = new Meal();

  meal.date = req.body.date;
  meal.text = req.body.text;
  meal.time = req.body.time;
  meal.calories = req.body.calories;
  meal.userId = req.user._id;

  meal.save(function(err) {
    if (err){
      res.send(err);
    }else{
        res.json({ message: 'Success: meal added: ', data: meal });
    }
  });
};

// Create endpoint /api/meals for GET
exports.getMeals = function(req, res) {
  Meal.findAllForUserId(req.user._id, function(err, meals) {
    if (err){
      res.send(err);
    }else{
      res.json(meals);
    }
  });
};

// Create endpoint /api/meals/:meal_id for GET
exports.getMeal = function(req, res) {
  Meal.findOneForUserId(req.user._id, req.params.meal_id, function(err, meal) {
    if (err){
      res.send(err);
    }else{
      res.json(meal);
    }
  });
};

// Create endpoint /api/meals/:meal_id for PUT
exports.putMeal = function(req, res) {
  Meal.findOneForUserId(req.user._id, req.params.meal_id, function(err, meal) {
    if (err){
      res.send(err);
    }else{
      if (req.body.text != undefined){
        meal.text = req.body.text;
      }
      if (req.body.date != undefined){
        meal.date = req.body.date;
      }
      if (req.body.time != undefined){
        meal.time = req.body.time;
      }
      if (req.body.calories != undefined){
        meal.calories = req.body.calories;
      }
      meal.save(function(err) {
        if (err){
          res.send(err);
        }else{
          res.json(meal);
        }
      });
    }
  });
};

// Create endpoint /api/meals/:meal_id for DELETE
exports.deleteMeal = function(req, res) {
  Meal.removeOneForUserId(req.user._id, req.params.meal_id, function(err) {
    if (err)
      res.send(err);
    res.json({ message: 'Success: Meal removed!' });
  });
};
