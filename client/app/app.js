const express = require('express'),
    router = express.Router();

require('dotenv').config();
const app = module.exports.app = exports.app = express();

app.set('port', `${process.env.NODE_PORT}`);

app.use(router);
app.use('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});
app.use('/assets', express.static(__dirname + '/node_modules'));

app.listen(app.get('port'));