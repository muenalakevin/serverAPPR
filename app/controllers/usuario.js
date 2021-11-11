const { httpError } = require("../helpers/handleError");
const usuarioModel = require("../models/usuario");
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
        const listAll = await usuarioModel.find({});
        res.send({ data: listAll });
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
    } = req.body;
    const salt = bcrypt.genSaltSync(11);
    const hash = bcrypt.hashSync(contrasenia_usuario, salt);
    const resDetail = await usuarioModel.create({
      nombre_usuario,
      usuario_usuario,
      contrasenia_usuario: hash,
      correo_usuario,
    });
    res.send({ data: resDetail });
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
    } = req.body;

    const resDetail = await usuarioModel.findOneAndUpdate(
      { _id: id },
      { nombre_usuario, usuario_usuario, contrasenia_usuario, correo_usuario }
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

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
