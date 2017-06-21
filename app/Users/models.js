const mongoose = require('mongoose'),
Schema = mongoose.Schema;

let User = new Schema({
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true}
});

module.exports = mongoose.model('User', User);