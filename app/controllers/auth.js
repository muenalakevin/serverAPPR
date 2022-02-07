const { httpError } = require("../helpers/handleError");
const usuarioModel = require("../models/usuario");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const rolModel = require("../models/rol");
const login = async (req, res) => {
    
  try {
    const { usuario_usuario, contrasenia_usuario } = req.body;
    const usuario = await usuarioModel.findOne({ usuario_usuario });

      if(usuario!=null){
        if(usuario.estado_usuario<=1){
        if (bcrypt.compareSync(contrasenia_usuario, usuario.contrasenia_usuario)) {
          await usuarioModel.findByIdAndUpdate({_id:usuario._id},{estado_usuario:1})
          const rol = await rolModel.findOne({_id:usuario.rol_usuario})
          jwt.sign({ _id:usuario._id,nombre_usuario:usuario.nombre_usuario,usuario_usuario:usuario.usuario_usuario,correo_usuario:usuario.correo_usuario,rol:rol }, "secretkey", { expiresIn: "30d" }, (err, token) => {
            res.json({
                token
            });
          });
        } else {
          
          res.sendStatus(403);
          res.json({mensaje:'Usuario o/y contraseña incorrecto'})
        }
      
    }else{
      res.sendStatus(409);
      res.json({mensaje:'Usuario se encuentra deshabilitado'})
    }
  }else{
    res.sendStatus(403);
    res.json({mensaje:'Usuario o/y contraseña incorrecto'})
  }
  } catch (e) {
    httpError(res, e);
  }
};
module.exports = {login };
