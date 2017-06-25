const express = require('express'),
	wrap = require('co-express'),
	User = require('./models'),
    policies = require('./../../Support/policies/policies');

module.exports.list = wrap(function*(req, res) {
    let decoded_user_id = req.decoded.user_id;

	users = yield User.find().select('-password').exec();
    res.json(users);
});

module.exports.get = wrap(function*(req, res) {
    let decoded_user_id = req.decoded.user_id;
    let id = req.params.id;

    let user = yield User.findById(id).select('-password');
    res.json(user);
});

module.exports.create = wrap(function*(req, res) {
    let {email, password} = req.body;

    let user = yield User.create({email, password})
	.catch((error) => {
		return res.status(400).end();
    })

    res.status(201).json(user);
});

module.exports.update = wrap(function* (req, res) {
    let decoded_user_id = req.decoded.user_id;
    let id = req.params.id;
    let {email, password} = req.body;

    yield policies.checkUserOwner(decoded_user_id, id, res);
    let user = yield User.findByIdAndUpdate(
        id,
        {email, password},
        {new: true}
    ).select('-password')
    .catch((error) => {
        res.status(400).end();
    })

    res.status(200).json(user);
});

module.exports.delete = wrap(function* (req, res) {
    let decoded_user_id = req.decoded.user_id;
    let id = req.params.id;

    yield policies.checkUserOwner(decoded_user_id, id, res);
    yield User.findByIdAndRemove(id)
    .catch((error) => {
		res.status(400).end();
    })

   res.status(204).end();
});