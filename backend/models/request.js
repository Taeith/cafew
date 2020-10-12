const mongoose = require('mongoose');

const requestSchema = mongoose.Schema({
  producer: { 
  	type: String, 
  	required: true 
  },
  recycler: {
  	type: String,
  	required: true
  },
  state: {
  	type: String,
  	required: true
  }
});

module.exports = mongoose.model('Request', requestSchema);