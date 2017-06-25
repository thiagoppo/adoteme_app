const express = require('express'),
wrap = require('co-express'),
Animal = require('./../../Domains/Animals/models');

module.exports.checkUserOwner = wrap(function*(owner_id, object_id, res){
    if(owner_id == object_id){
        return true;
    }else{
        res.status(401).end();
    }
});

module.exports.checkAnimalOwner = wrap(function*(owner_id, object_id, res){
    let animal = yield Animal.findOne({id: object_id, user_id: owner_id});
    if(!animal){
        res.status(401).end();
    }
});