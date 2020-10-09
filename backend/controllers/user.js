
const User = require('../models/user');
const jsonWebToken = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signup = (request, response, next) => {  
  console.log(request)
  bcrypt.hash(request.body.password, 10)
    .then(hash => {
      console.log('create user');
      console.log(request.body.email, request.body.username);
      const user = new User({
        email: request.body.email,
        username: request.body.username,
        password: hash
      });
      console.log('save user');
      user.save()
        .then(() => {
          response.status(201).json({ message: 'Utilisateur créé !' })
          console.log('success');
        })
        .catch(error => {response.status(400).json({ error })
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