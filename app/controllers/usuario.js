const { httpError } = require("../helpers/handleError");
const usuarioModel = require("../models/usuario");
const rolModel = require("../models/rol");
const bcrypt = require("bcrypt")


const getItems = async (req, res) => {
 
  try {
    const listAll = await usuarioModel.find({estado_usuario:{$lte:1}});

    //.io.emit("new-message", { content: req.body.content });
    res.send(listAll);
  } catch (e) {
    httpError(res, e);
  }
};
const getItemsadmin = async (req, res) => {
 
  try {
    const listAll = await usuarioModel.find({});

    //.io.emit("new-message", { content: req.body.content });
    res.send(listAll);
  } catch (e) {
    httpError(res, e);
  }
};
const getItemsMesero = async (req, res) => {
 
  try {
    const listAll = await usuarioModel.find({rol_usuario:"618f127c632c3638ced99ba9"});

    //.io.emit("new-message", { content: req.body.content });
    res.send(listAll);
  } catch (e) {
    httpError(res, e);
  }
};


const searchUsername = async (req, res) => {
  try {
    const { usuario_usuario   } = req.body;

    const usuario = await usuarioModel.findOne({ usuario_usuario});
if(usuario.id!=null){
  res.send(true);
}else{
  res.send(false);
}
     
    } catch (e) {
      httpError(res, e);
    }
};

const searchEmail = async (req, res) => {
  try {
    const { correo_usuario   } = req.body;

    const usuario = await usuarioModel.findOne({ correo_usuario});

if(usuario.id!=null){
  res.send(true);
}else{
  res.send(false);
}
     
    } catch (e) {
      httpError(res, e);
    }
};


const getItem = async (req, res) => {
    try {
      const { _id } = req.body;
      const usuario = await usuarioModel.findOne({ _id });
        res.send({ data: usuario });
      } catch (e) {
        httpError(res, e);
      }
};



const createItem = async (req, res) => {
  try {

    const {
      nombre_usuario,
      usuario_usuario,
      contrasenia_usuario,
      correo_usuario,
      rol_usuario
    } = req.body.usuario;
    const salt = await bcrypt.genSaltSync(11);
    const hash =await bcrypt.hashSync(contrasenia_usuario, salt);
    const resDetail = await usuarioModel.create({
      nombre_usuario,
      usuario_usuario,
      contrasenia_usuario: hash,
      correo_usuario,
      rol_usuario
    });
    const listAll = await usuarioModel.find({estado_usuario:{$lte:1}});
    const listAllAdmin = await usuarioModel.find({});
    req.io.emit('usuarios', listAll);
    req.io.emit('usuariosAdmin', listAllAdmin);
    res.send({ data: resDetail });
  } catch (e) {
    httpError(res, e);
  }
};





const updateItem = async (req, res) => {
  try {

    const {
      _id,
      nombre_usuario,
      usuario_usuario,
      contrasenia_usuario,
      correo_usuario,
      rol_usuario,
      estado_usuario
    } = req.body.usuario;
    let resDetail

    if(contrasenia_usuario==null){
     resDetail = await usuarioModel.findOneAndUpdate(
      { _id},
      { nombre_usuario,estado_usuario, usuario_usuario, correo_usuario,rol_usuario },
    );
    
   
  }else{
    
    
    const salt = await bcrypt.genSaltSync(11);
    const hash =await bcrypt.hashSync(contrasenia_usuario, salt);

     resDetail = await usuarioModel.findOneAndUpdate(
      { _id },
      { nombre_usuario, estado_usuario,usuario_usuario,contrasenia_usuario: hash, correo_usuario,rol_usuario }
    );

  }
  const listAll = await usuarioModel.find({estado_usuario:{$lte:1}});
  const listAllAdmin = await usuarioModel.find({});
  req.io.emit('usuarios', listAll);
  req.io.emit('usuariosAdmin', listAllAdmin);
  res.send({ data: resDetail });
  } catch (e) {
    httpError(res, e);
  }
};
const resetUser = async (req, res) => {
  try {

    const {
      code,
      contrasenia_usuario,
      repeatContrasenia_usuario,
    } = req.body;
   



    if(code!=''){
      const salt = await bcrypt.genSaltSync(11);
      const hash =await bcrypt.hashSync(contrasenia_usuario, salt);
  
      let  resDetail = await usuarioModel.findOneAndUpdate(
        { codeRecovery:code },
        { contrasenia_usuario: hash, codeRecovery:''}
      );
      if(resDetail!=null){

        res.send({ data: resDetail });
      }else{
        res.sendStatus(403)
      }
     
    }else{
      res.sendStatus(403)
    }
   

  } catch (e) {
    httpError(res, e);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const resDetail =  await usuarioModel.findOneAndDelete({ _id});
    const listAll =  await usuarioModel.find({});
    await req.io.emit('usuarios', listAll);
    res.send({ data: _id });
  } catch (e) {
    httpError(res, e);
  }
};

module.exports = {resetUser,getItemsadmin,getItems,getItemsMesero, getItem, searchEmail,searchUsername,createItem, updateItem, deleteItem };
