const mongoose = require('mongoose');

const requestSchema = mongoose.Schema({
  producer: { 
  	type: String, 
  	required: true 
  },
  recycler: {
  	type: String,
  	required: false
  }
});

module.exports = mongoose.model('Request', requestSchema);