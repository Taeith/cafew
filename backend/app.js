
const express = require('express');

// database
const mongoose = require('mongoose');

// routes
const userRoutes = require('./routes/user');

// others
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb+srv://Taeith:qoowoiqP28@cluster0.r1zvs.mongodb.net/<dbname>?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connexion réussie à la base de données !");
}).catch(() => {
  console.log("La connexion à la base de données pas pas pu être établit.");
});

app.use(bodyParser.json());

app.use((request, response, next) => {
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});

app.use('/api/auth/', userRoutes);

app.get('/', (request, response, next) => {
	response.status(200).json({
		markers: [
        {
          longitude: 48.85,
          latitude: 2.6,
          message: "from api 1"
        },
        {
          longitude: 48.85,
          latitude: 2.62,
          message: "from api 2"
        },
      ]
	});
});

module.exports = app;