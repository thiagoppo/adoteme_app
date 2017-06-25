    const express = require('express'),
	wrap = require('co-express'),
    jwt = require('jsonwebtoken'),
    User = require('./../Users/models');

module.exports.auth = wrap(function*(req, res) {
    let {email,password} = req.body;
    let user = yield User.findOne({email:email})
    if(!user){
        return res.status(401).end();
    }

    user.comparePassword(password)
    .then(()=>{
        let token = jwt.sign({user_id: user._id}, `${process.env.SECRET}`, {expiresIn: '24h'});
        return res.json({token: token});
    })
    .catch(()=>{
        return res.status(401).end();
    });
});