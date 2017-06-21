const mongoose = require('mongoose'),
bluebird = require('bluebird');

module.exports = function(){
    return new Promise(function(resolve, reject) {
        mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`);
        mongoose.connection.on('connected', function(connection){
            return resolve(connection);
        });
        mongoose.connection.on('error', function(e){
            return reject(e);
        });
   });
}