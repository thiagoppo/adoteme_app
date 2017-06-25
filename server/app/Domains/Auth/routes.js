const express = require('express'),
	router = express.Router(),
	controller = require('./controllers');

router.post('/auth', (req,res)=>{
    controller.auth(req,res);
});

module.exports = router;
