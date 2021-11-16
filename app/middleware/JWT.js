

const jwt = require("jsonwebtoken");

const checkJWT = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearertoken = bearerHeader.split(" ")[1];
    req.token = bearertoken;
    jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
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
