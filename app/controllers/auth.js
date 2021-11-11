const { httpError } = require("../helpers/handleError");
const usuarioModel = require("../models/usuario");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const login = async (req, res) => {
    
  try {
    const { usuario_usuario, contrasenia_usuario } = req.body;
    const usuario = await usuarioModel.findOne({ usuario_usuario });

    if (bcrypt.compareSync(contrasenia_usuario, usuario.contrasenia_usuario)) {
        const _id = usuario._id;
      jwt.sign({ _id }, "secretkey", { expiresIn: "30d" }, (err, token) => {
        res.json({
          token,
        });
      });
    } else {
      res.sendStatus(403);
    }
  } catch (e) {
    httpError(res, e);
  }
};
module.exports = {login };
