const express = require('express'),
    load = require('express-load'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    expressValidator = require('express-validator'),
    database = require('./Support/config/database');

require('dotenv').config();
const app = module.exports.app = exports.app = express();

app.set('port', `${process.env.NODE_PORT}`);
app.set('superSecret', `${process.env.SECRET}`);

app.use(bodyParser.json());
app.use(expressValidator());

app.use('/api/v1', router);
router.use('/', require('./Domains/Auth/routes'));
router.use('/users', require('./Domains/Users/routes'));
router.use('/animals', require('./Domains/Animals/routes'));

database().then(function(){
    app.listen(app.get('port'));
})