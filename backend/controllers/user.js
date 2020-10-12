const User = require('../models/user');
const jsonWebToken = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function getById(id, callback) {
  User.findOne({ _id: id })
  .then(user => {
    console.log("[INFO] User has been found");
    callback(user);
  })
  .catch(error => {
    console.log("[ERROR] No user found with this id");
    response.status(400).json({});
  });
}

exports.get = (request, response, next) => {
  console.log('[OPEN] USER GET');
  getById(request.params.id, user => {
    response.status(200).json({
      _id: user._id,
      email: user.email,
      username: user.username,
      quantity: user.quantity,
      street: user.street,
      city: user.city,
      day: user.day,
      hour: user.hour
    });
  });
};

exports.delete = (request, response, next) => {
    console.log("[OPEN] USER DELETE");
    User.deleteOne({_id: request.params.id})
    .then(() => {
      console.log("[INFO] User has been deleted");
      response.status(200).json({
        message: 'Deleted!'
      });
    })
    .catch(error => {
      console.log("[ERROR] User can't be deleted");
      response.status(400).json({
        error: error
      });
    }
  );
}

exports.update = (request, response, next) => {
  console.log('[OPEN] USER UPDATE');
  getById(request.params.id, user => {
    const newUser = new User({
      _id: user._id,
      isRecycler: user.isRecycler,
      email: request.body.email,
      username: request.body.username,
      password: user.password,
      quantity: request.body.quantity,
      street: request.body.street,
      city: request.body.city,
      day: request.body.day,
      hour: request.body.hour
    });
    User.updateOne({ _id: user._id }, newUser)
    .then(() => {
      console.log("[INFO] User has been updated");
      response.status(201).json({});
    })
    .catch(error => {
      console.log("[ERROR] User can't be updated");
      response.status(400).json({})
    });  });

}