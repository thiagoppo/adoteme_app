const express = require('express'),
	router = express.Router(),
	controller = require('./controllers'),
    jwtAuthenticate = require('./../../Support/middlewares/jwtMiddleware');

router.get('/', jwtAuthenticate, (req,res)=>{
    controller.list(req,res);
});

router.post('/', (req,res)=>{
    controller.create(req,res);
});

router.get('/:id', jwtAuthenticate, (req,res)=>{
    controller.get(req,res);
});

router.put('/:id', jwtAuthenticate, (req,res)=>{
    controller.update(req,res);
});

router.delete('/:id', jwtAuthenticate, (req,res)=>{
    controller.delete(req,res);
});

module.exports = router;
