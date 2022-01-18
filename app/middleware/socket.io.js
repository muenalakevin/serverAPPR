const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

const checkSocketJWT = function(socket, next){

    /* if (socket.handshake.headers && socket.handshake.headers.authorization){
      jwt.verify(socket.handshake.headers.authorization.split('"')[1], 'secretkey', function(err, decoded) {
        if (err) return next(new Error('Authentication error'));
        socket.decoded = decoded;
        next();
      });
    }
    else {
        
      next(new Error('Authentication error'));
    } */    
    next();
  }
module.exports = checkSocketJWT;



