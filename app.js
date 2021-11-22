require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require('express');
const {dbConnect} = require('./config/mongo')
const cors = require('cors');

const app = express();
const socketioJwt = require('socketio-jwt');
const PORT = process.env.PORT || 3000;
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
      origin: process.env.ORIGIN,
      credentials: true
    }
  });
/**
 * -----------------------------------------------------
 * Socket.io conexion
 * ----------------------------------------------------
 */
 const JWT = require('./app/middleware/socket.io')
 io.use( JWT/* function(socket, next){
   
    if (socket.handshake.query && socket.handshake.query.token){
      jwt.verify(socket.handshake.query.token.split('"')[1], 'secretkey', function(err, decoded) {
        if (err) return next(new Error('Authentication error'));
        socket.decoded = decoded;
        next();
      });
    }
    else {
        
      next(new Error('Authentication error'));
    }    
  } */).on('connection', function(socket) {
      // Connection now authenticated to receive further events
      socket.emit('message', {saludo:"hola"});
  });

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  req.io = io;
  return next();
});

//routes
app.use('/api/',require('./app/routes'))




//connection mongodb
dbConnect();
http.listen(PORT, ()=>{
    console.log('nodejs app run '+PORT)
})