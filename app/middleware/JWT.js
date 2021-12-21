

const jwt = require("jsonwebtoken");
const jwt_decode= require('jwt-decode');
const checkJWT = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearertoken = bearerHeader.split(" ")[1];
    req.user_token = jwt_decode(bearertoken);;
    jwt.verify(bearertoken, process.env.SECRET_KEY, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
};
module.exports = checkJWT;
