const mongoose = require('mongoose');

const markerSchema = mongoose.Schema({
  userId: { 
  	type: String, 
  	required: true 
  },
  longitude: {
  	type: Number,
  	required: false
  },
  latitude: { 
  	type: Number, 
  	required: false 
  }
});

module.exports = mongoose.model('Marker', markerSchema);