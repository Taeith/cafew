
const User = require('../models/user');
const jsonWebToken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const markerCtrl = require('../controllers/marker');

exports.signup = (request, response, next) => {  
  console.log(request)
  bcrypt.hash(request.body.password, 10)
    .then(hash => {
      console.log('Try to create user with: ');
      console.log(request.body.isRecycler, request.body.email, request.body.username, request.body.password);
      const user = new User({
        isRecycler: request.body.isRecycler,
        email: request.body.email,
        username: request.body.username,
        password: hash,
        quantity: '500',
        street: '',
        city: '',
        day: '1',
        hour: '6:00'
      });
      console.log('save user');
      user.save()
        .then(newUser => {
          // try to create a marker
          markerCtrl.insert(newUser._id, undefined, undefined)
          .then(() => {
            response.status(201).json({});
            console.log('We have created a mark and a user');
          });
        })
        .catch(error => {response.status(500).json({ error })
          console.log(error);});
    })
    .catch(error => {
      response.status(500).json({ error })
      console.log(error);
    });
};

exports.login = (request, response, next) => {
  User.findOne({ email: request.body.email })
    .then(user => {
      if (!user) {
        return response.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(request.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return response.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          response.status(200).json({
            userId: user._id,
            username: user.username,
            token: jsonWebToken.sign({
            	userId: user._id
            },
            'RANDOM_TOKEN_SECRET', {
            	expiresIn: '24h'
            })
          });
        })
        .catch(error => response.status(500).json({ error }));
    })
    .catch(error => response.status(500).json({ error }));
};

function getById(id, callback) {
  User.findOne({ _id: id })
  .then(user => callback(user));
}

exports.get = (request, response, next) => {
  const token = request.headers.authorization.split(" ")[1];
  const tokenUserId = jsonWebToken.verify(token, 'RANDOM_TOKEN_SECRET').userId;
  if (request.params.id == tokenUserId) {
    console.log('search user');
    User.findOne({ _id: request.params.id })
    .then(user => response.status(200).json({
      _id: user._id,
      email: user.email,
      username: user.username,
      quantity: user.quantity,
      street: user.street,
      city: user.city,
      day: user.day,
      hour: user.hour
    }))
    .catch(error => response.status(500).json({ error }));
  } else {
    response.status(401).json({});
  }
};

exports.update = (request, response, next) => {

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

    console.log(JSON.stringify(newUser));

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