const { httpError } = require("../helpers/handleError");
const usuarioModel = require("../models/usuario");
const rolModel = require("../models/rol");
const bcrypt = require("bcrypt")


const getItems = async (req, res) => {
  try {
    const listAll = await usuarioModel.find({});
    res.send({ data: listAll });
  } catch (e) {
    httpError(res, e);
  }
};

const getItem = async (req, res) => {
    try {
      console.log("sss");
      const { _id } = req.body;
      const usuario = await usuarioModel.findOne({ _id });
        res.send({ data: usuario });
      } catch (e) {
        httpError(res, e);
      }
};

const getRol = async (req, res) => {
  try {

    const { id_usuario,codigo_rol } = req.body;
    
      const rol = await rolModel.findOne({ codigo_rol });

      const rolesUsuario = await usuario_rolModel.find({id_usuario});
      
      if(rol!=null){
        const rolUsuario = rolesUsuario.find(rolUsuario=>rolUsuario.id_rol==rol._id)
      
        if(rolUsuario!=null){
          res.send({ data: rolUsuario, exist:true });
        }else{
          res.send({ mensaje: 'usuario no cuenta con ese rol',exist:false });
        }
      }else{
        res.send({ mensaje: 'rol no existe',exist:false });
      }
      
      
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
    } = req.body;
    const salt = bcrypt.genSaltSync(11);
    const hash = bcrypt.hashSync(contrasenia_usuario, salt);
    const resDetail = await usuarioModel.create({
      nombre_usuario,
      usuario_usuario,
      contrasenia_usuario: hash,
      correo_usuario,
      rol_usuario
    });
    res.send({ data: resDetail });
  } catch (e) {
    httpError(res, e);
  }
};


const createRol = async (req, res) => {
  try {
    const {
      id_usuario,
      id_rol
    } = req.body;
    const noExist = await usuario_rolModel.find({id_usuario,id_rol})

    if(noExist==[]){
      const resDetail = await usuario_rolModel.create({
        id_usuario,
        id_rol
      });
      res.send({ data: resDetail });
    }else{
      res.send({ msg: 'Rol existente' });
    }
   
   
  } catch (e) {
    httpError(res, e);
  }
};


const updateItem = async (req, res) => {
  console.log(req.body);
  try {
    const { id } = req.body;
    const {
      nombre_usuario,
      usuario_usuario,
      contrasenia_usuario,
      correo_usuario,
      rol_usuario
    } = req.body;

    const resDetail = await usuarioModel.findOneAndUpdate(
      { _id: id },
      { nombre_usuario, usuario_usuario, contrasenia_usuario, correo_usuario,rol_usuario }
    );
    res.send({ data: resDetail });
  } catch (e) {
    httpError(res, e);
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.body;
    const resDetail = await usuarioModel.deleteOne({ _id: id });
    res.send({ data: resDetail });
  } catch (e) {
    httpError(res, e);
  }
};

module.exports = {createRol, getRol, getItems, getItem, createItem, updateItem, deleteItem };
