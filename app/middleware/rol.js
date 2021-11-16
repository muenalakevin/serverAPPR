const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

const checkRol = (rol) => {
  (req, res, next) => {
    const bearerHeader = req.headers["authorization"].split(" ")[1];
    var decoded = jwt_decode(bearerHeader);
    console.log(decoded);
    if (decoded.rol) {
      res.sendStatus(403);
    } else {
      var decoded = jwt_decode(req.token);
      console.log(decoded);
      next();
    }
  };
};
module.exports = checkRol;
