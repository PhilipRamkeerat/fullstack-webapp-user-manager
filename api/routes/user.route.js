// Using mongose ORM to save datas in Mongo Database

const express = require('express');
const app = express();
const userRoutes = express.Router();

// Require user model
// let User = require('../models/User');
let User = require('../models/Users');

// Save user
userRoutes.route('/add').post(function (req, res) {
  let user = new User(req.body);
  user.save()
    .then(user => {
      res.status(200).json({ 'User': 'User has been added successfully' });
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// Get s
userRoutes.route('/').get(function (req, res) {
  User.find(function (err, s) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(s);
    }
  });
});

// Get user informations for update
userRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;

  User.findById(id, function (err, user) {
    res.json(user);
  });
});

// PUT endpoint for user to update
userRoutes.route('/update/:id').put(function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (!user)
      res.status(404).send("Record not found");
    else {
      user.userName = req.body.userName;
      user.userEmail = req.body.userEmail;
      user.userCPF = req.body.userCPF;
      user.userPhone = req.body.userPhone;

      user.save().then(user => {
        res.json('Update complete');
      })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Delete User
userRoutes.route('/delete/:id').delete(function (req, res) {
  User.findByIdAndRemove({ _id: req.params.id }, function (err, user) {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});

/*
* Search user by Name or Description
* And return json with these informations about user.
*/
userRoutes.route('/search/:word').get(function (req, res) {
  let word = req.params.word;

  User.find({
    userName: { $regex: new RegExp(word), $options: 'i' }
  }, function (err, user) {
    if (err) {
      res.json(err);
    } else {
      res.json(user);
    }
  })
});

module.exports = userRoutes;





