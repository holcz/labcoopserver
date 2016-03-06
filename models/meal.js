var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Meal = new Schema({
  date: String,
  time: String,
  text: String,
  calories: Number,
  userId: String
});

Meal.statics.findAllForUserId = function(userid, cb){
  this.find({ 'userId': userid }, function(err, meals){
    if (err){
      return cb(err, null);
    }
    return cb(null, meals);
  });
};

Meal.statics.findOneForUserId = function(userid, id, cb){
  this.findOne({ userId: userid, _id: id}, function(err, meal){
    if (err){
      return cb(err, null);
    }
    return cb(null, meal);
  });
};

Meal.statics.removeOneForUserId = function(userid, id, cb){
  this.remove({'userId': userid, '_id': id}, function(err){
    return cb(err);
  });
};

module.exports = mongoose.model('Meal', Meal);
