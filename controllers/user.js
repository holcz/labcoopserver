var User = require('../models/user');

exports.postUser = function(req, res){
  var user = new User(
    { username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      firstname: (req.body.firstname != undefined)?req.body.firstname:'',
      lastname: (req.body.lastname != undefined)?req.body.lastname:'',
      gender: (req.body.gender != undefined)?req.body.gender:''
    }
  );

  user.save(function(err) {
    if (err){
      res.send(err);
    }else{
      res.json({ message: 'Success, user added.'} );
    }
  });
};

//TODO: Soo not a good idea! Delete it!
exports.getUsers = function(req, res){
  User.find(function(err, users){
    if (err){
      res.send(err);
    }else{
      res.json(users);
    }
  });
};

// Create endpoint /api/users/:username for GET
exports.getUser = function(req, res) {
  User.findByUsername(req.user.username, function(err, user) {
    if (err){
      res.send(err);
    }else{
      res.json(user);
    }
  });
};

// Create endpoint /api/users/:username for PUT
exports.putUser = function(req, res) {
  User.findByUsername(req.user.username, function(err, user) {
    if (err){
      res.send(err);
    }else{
      if (req.body.password != undefined){
        user.password = req.body.password;
      }
      if (req.body.email != undefined){
        user.email = req.body.email;
      }
      if (req.body.firstname != undefined){
        user.firstname = req.body.firstname;
      }
      if (req.body.lastname != undefined){
        user.lastname = req.body.lastname;
      }
      if (req.body.gender != undefined){
        user.gender = req.body.gender;
      }

      if (req.body.maxCalories != undefined){
        user.maxCalories = req.body.maxCalories;
      }

      user.save(function(err) {
        if (err){
          res.send(err);
        }else{
          res.json(user);
        }
      });
    }
  });
};
//
// Create endpoint /api/meals/:meal_id for DELETE
exports.deleteUser = function(req, res) {
  User.removeByUsername(req.user.username, function(err) {
    if (err)
      res.send(err);
    res.json({ message: 'Success: user removed!' });
  });
};
