const { httpError } = require("../helpers/handleError");
const mesaModel = require("../models/mesa");


const getItems = async (req, res) => {
 
  try {
    const listAll = await mesaModel.find({});

    //.io.emit("new-message", { content: req.body.content });
    res.send(listAll);
  } catch (e) {
    httpError(res, e);
  }
};

const getItem = async (req, res) => {
    try {
      const { _id } = req.body;
      const usuario = await mesaModel.findOne({ _id });
        res.send({ data: usuario });
      } catch (e) {
        httpError(res, e);
      }
};



const createItem = async (req, res) => {
  try {
console.log(req.body.mesa);
    const {
        nombre_mesa,
        descripcion_mesa
    } = req.body.mesa;
    const resDetail = await mesaModel.create({
        nombre_mesa,
        descripcion_mesa
    });
    const listAll = await mesaModel.find({});
    req.io.emit('mesas', listAll);
    res.send({ data: resDetail });
  } catch (e) {
    httpError(res, e);
  }
};





const updateItem = async (req, res) => {
  try {
    const {
      _id,
      nombre_mesa,
        descripcion_mesa
    } = req.body.mesa;


     let resDetail = await mesaModel.findOneAndUpdate(
      { _id},
      { nombre_mesa,
        descripcion_mesa },
    );
    
   
  const listAll = await mesaModel.find({});
  req.io.emit('mesas', listAll);
  
  res.send({ data: resDetail });
  } catch (e) {
    httpError(res, e);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const resDetail =  await mesaModel.findOneAndDelete({ _id});
    const listAll =  await mesaModel.find({});
    await req.io.emit('mesas', listAll);
    res.send({ data: _id });
  } catch (e) {
    httpError(res, e);
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
