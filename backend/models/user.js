
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
	isRecycler: {
		type: Boolean,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	quantity: {
		type: String,
		required: false
	},
	street: {
		type: String,
		required: false
	},
	city: {
		type: String,
		required: false
	},
	day: {
		type: String,
		required: false
	},
	hour: {
		type: String,
		required: false
	}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);