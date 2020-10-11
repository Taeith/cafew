const User = require('../models/user');
const jsonWebToken = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function getById(id, callback) {
  User.findOne({ _id: id })
  .then(user => callback(user))
  .catch(error => response.status(500).json({ error }));
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
      console.log('ok update');
      response.status(201).json({});
    })
    .catch(error => {
      console.log('error update');
      response.status(500).json({})
    });
  });

}