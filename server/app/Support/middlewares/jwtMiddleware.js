const jwt = require('jsonwebtoken');

module.exports = function(req,res,next) {
    let token = req.headers['authorization'];
    if(!token){
        return res.status(401).end();
    }
    jwt.verify(token, `${process.env.SECRET}`, (err, decoded)=>{
        if(err){
            return res.status(401).end();
        }
        req.decoded = decoded;
        return next();
    });
};