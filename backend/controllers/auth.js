const User = require('../models/user');
const jsonWebToken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const markerCtrl = require('../controllers/marker');

exports.signup = (request, response, next) => {  
  console.log("[OPEN] AUTH SIGNUP");
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
  console.log("[OPEN] AUTH LOGIN : " + request.body.email);
  User.findOne({ email: request.body.email })
  .then(user => {
    if (!user) {
      console.log("[ERROR] User has not been found.");
      return response.status(401).json({ 
        error: 'Utilisateur non trouvé !'
      });
    }
    bcrypt.compare(request.body.password, user.password)
    .then(valid => {
      if (!valid) {
        console.log("[ERROR] User password is incorrect.");
        return response.status(401).json({ 
          error: 'Mot de passe incorrect !' 
        });
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
    })
    .catch(error => {
      response.status(500).json({});
    })
  .catch(error => response.status(500).json({}));
};