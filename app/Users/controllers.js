const express = require('express'),
router = express.Router(),
User = require('./models');

router.get('/', function(req, res) {
    User.find(function(err,users){
		if(err){
			switch(err.code) {
				default:
					var error = 'users_not_found';
					var msg = "Usuários não encontrados";
					break
			}

			return res.status(400).json({
				error: error,
				msg: msg
			});	
		}

		return res.json(users);
	});
});

router.post('/', function(req, res) {
	req.checkBody('email').notEmpty();
	req.checkBody('password').notEmpty();
	var errors = req.validationErrors();
  	if (errors) {
    	return res.status(400).json({
			error: "validation_error",
			message: errors[0].msg
    	});
	}

	let user = new User();
	user.email = req.body.ssss;
	user.password = req.body.password;
	user.save(function(err){
		if(err){
			return res.status(400).json({
				error: err.name,
				message: err._message
			});	
		}

		return res.status(201).json(user);
	});
});

module.exports = router;
