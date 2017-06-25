const mongoose = require('mongoose'),
Schema = mongoose.Schema,
bcrypt = require('bcrypt-nodejs'),
SALT_FACTOR = 10;

let User = new Schema({
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true}
});

User.pre('save', function(next){
	let user = this;
 	if(!user.isModified('password')){
 		return next();
 	}
    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
		if(err){
			return next(err);
        }
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if(err){
    			return next(err);
        	}
            user.password = hash;
            return next();
        });		
    });
});


User.methods.comparePassword = function(attemptedPassword){
	return new Promise((resolve, reject) => {
		bcrypt.compare(attemptedPassword, this.password, (err, isMatch) =>{
			if(!isMatch){
				return reject();
			}
			return resolve();
		})
	})
};

module.exports = mongoose.model('User', User);