const { httpError } = require("../helpers/handleError");
const platoModel = require("../models/plato");
const path = require('path')
const  fs = require('fs-extra');
const getItemsAdmin = async (req, res) => {
 
  try {
    const listAll = await platoModel.find({});

    //.io.emit("new-message", { content: req.body.content });
    res.send(listAll);
  } catch (e) {
    httpError(res, e);
  }
};
const getItems = async (req, res) => {
 
  try {
    const listAll = await platoModel.find({estado_plato:{$lte:1}});

    //.io.emit("new-message", { content: req.body.content });
    res.send(listAll);
  } catch (e) {
    httpError(res, e);
  }
};

const getItem = async (req, res) => {
    try {
      const { _id } = req.body;
      const usuario = await platoModel.findOne({ _id });
        res.send({ data: usuario });
      } catch (e) {
        httpError(res, e);
      }
};



const createItem = async (req, res) => {
  try {

    const {
        nombre_plato,
        descripcion_plato,
        receta_plato,
        precio_plato,
        categorias_plato,
        estado_plato
    } = req.body.plato;
    const resDetail = await platoModel.create({
        nombre_plato,
        descripcion_plato,
        receta_plato,
        precio_plato,
        categorias_plato,
        estado_plato
    });
    const listAllAdmin = await platoModel.find({});
    const listAll = await platoModel.find({estado_plato:{$lte:1}});
    req.io.emit('platos', listAll);
    req.io.emit('platosAdmin', listAllAdmin);
    res.send({ data: resDetail });
  } catch (e) {
    httpError(res, e);
  }
};





const updateItem = async (req, res) => {
  try {

    const {
      _id,
      nombre_plato,
      usuario_usuario,
      descripcion_plato,
      receta_plato,
      precio_plato,
      categorias_plato,
      estado_plato
    } = req.body.plato;
    let resDetail
 

     resDetail = await platoModel.findOneAndUpdate(
      { _id},
      { nombre_plato,
        usuario_usuario,
        descripcion_plato,
        receta_plato,
        precio_plato,
        categorias_plato,
        estado_plato },
    );
    
   
  const listAllAdmin = await platoModel.find({});
  const listAll = await platoModel.find({estado_plato:{$lte:1}});
  req.io.emit('platos', listAll);
  req.io.emit('platosAdmin', listAllAdmin);

  res.send({ data: resDetail });
  } catch (e) {
    httpError(res, e);
  }
};
const subirFoto = async (req, res) => {

/*   try {
console.log(req.body);
    const {
      _id,
      nombre_plato,
      usuario_usuario,
      descripcion_plato,
      receta_plato,
      precio_plato,
      categorias_plato
    } = req.body.plato;
    let resDetail
 

     resDetail = await platoModel.findOneAndUpdate(
      { _id},
      { nombre_plato,
        usuario_usuario,
        descripcion_plato,
        receta_plato,
        precio_plato,
        categorias_plato },
    );
    
   
  const listAll = await platoModel.find({});
  req.io.emit('platos', listAll);

  res.send({ data: resDetail });
  } catch (e) {
    httpError(res, e);
  } */
};

const deleteItem = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const resDetail =  await platoModel.findOneAndDelete({ _id});
    const listAllAdmin =  await platoModel.find({});
    const listAll = await platoModel.find({estado_plato:{$lte:1}});
    await req.io.emit('platos', listAll);
    await req.io.emit('platosAdmin', listAllAdmin);
    res.send({ data: _id });
  } catch (e) {
    httpError(res, e);
  }
};



module.exports = { getItemsAdmin,getItems, getItem, createItem, subirFoto,updateItem, deleteItem };
