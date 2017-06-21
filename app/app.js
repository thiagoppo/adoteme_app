const express = require('express'),
    load = require('express-load'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    expressValidator = require('express-validator');
    database = require('./Core/Config/database');

require('dotenv').config();
const app = module.exports.app = exports.app = express();

/**
 * Configuration
 */
app.set('port', `${process.env.NODE_PORT}`);
app.use(bodyParser.json());
app.use(expressValidator());

/**
 * Routes
 */
app.use('/api/v1', router);
router.use('/users', require('./Users/controllers'));
router.use('/animals', require('./Animals/controllers'));

function startApp() {
    database().then(function(){
        app.listen(app.get('port'));
    })
}

startApp();