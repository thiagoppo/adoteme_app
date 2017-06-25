const express = require('express'),
    wrap = require('co-express'),
    Animal = require('./models'),
    policies = require('./../../Support/policies/policies');

module.exports.list = wrap(function*(req, res) {
    let filters = {};

    if(req.query.user_id){
        filters.user = req.query.user_id;
    }

	animals = yield Animal.find(filters).exec();
    res.json(animals);
});

module.exports.get = wrap(function*(req, res) {
    let decoded_user_id = req.decoded.user_id;
    let id = req.params.id;

    let animal = yield Animal.findById(id);
    res.json(animal);
});

module.exports.create = wrap(function*(req, res) {
    let decoded_user_id = req.decoded.user_id;
    let {name,breed} = req.body;

	let animal = yield Animal.create({
		name: name,
        breed: breed,
        user: decoded_user_id
	})
    .catch((error) => {
		res.status(400).end();
    });
	
	res.status(201).json(animal);
});

module.exports.update = wrap(function*(req, res) {
    let decoded_user_id = req.decoded.user_id;
    let id = req.params.id;
    let {name,breed} = req.body;

    yield policies.checkAnimalOwner(decoded_user_id, id, res);
    let user = yield Animal.findByIdAndUpdate(
        id,
        {name, breed},
        {new: true}
    )
    .catch((error) => {
        res.status(400).end();
    });

    res.status(200).json(user);
});

module.exports.delete = wrap(function* (req, res) {
    let decoded_user_id = req.decoded.user_id;
    let id = req.params.id;

    yield policies.checkAnimalOwner(decoded_user_id, id, res);
    yield Animal.findByIdAndRemove(id)
    .catch((error) => {
		res.status(400).end();
    });

    res.status(204).end();
});