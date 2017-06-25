const mongoose = require('mongoose'),
Schema = mongoose.Schema;

let Animal = new Schema({
	name: {type: String, required: true},
    breed: {type: String, required: true},
    user: {type: Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Animal', Animal);