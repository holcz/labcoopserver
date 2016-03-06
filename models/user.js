var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var User = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  firstname: String,
  lastname: String,
  gender: String,
});

User.pre('save', function(callback) {
  var user = this;
  //The password has to be modified
  if (!user.isModified('password')) return callback();
  //Salt and Has the password
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return callback(err);
      user.password = hash;
      callback();
    });
  });
});

User.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

User.statics.findByUsername = function(username, cb){
  this.findOne({ 'username': username }, function(err, user){
    if (err){
      return cb(err, null);
    }
    return cb(null, user);
  });
};

User.statics.removeByUsername = function(username, cb){
  this.remove({'username': username}, function(err){
    return cb(err);
  });
};

module.exports = mongoose.model('User', User);
