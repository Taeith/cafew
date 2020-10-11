
const express = require('express');

// database
const mongoose = require('mongoose');

// routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const markerRoutes = require('./routes/marker');
const requestRoutes = require('./routes/request');

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
	response.setHeader('Access-Control-Allow-Headers', '*');
	response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	response.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

app.use('/api/user/', userRoutes);
app.use('/api/auth/', authRoutes);
app.use('/api/request/', requestRoutes);
app.use('/api/markers/', markerRoutes);

module.exports = app;