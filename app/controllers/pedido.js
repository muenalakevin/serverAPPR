const { httpError } = require("../helpers/handleError");
const pedidoModel = require("../models/pedido");
const mesaModel = require("../models/mesa");
const path = require('path')
const  fs = require('fs-extra');
const getItems = async (req, res) => {
 
  try {
    const listAll = await pedidoModel.find({});

    //.io.emit("new-message", { content: req.body.content });
    res.send(listAll);
  } catch (e) {
    httpError(res, e);
  }
};

const getItem = async (req, res) => {
    try {
      const  _id  = req.params._id;

      const pedido = await pedidoModel.findOne({ id_mesa:_id });
        res.send( pedido );
      } catch (e) {
        httpError(res, e);
      }
};



const createItem = async (req, res) => {
  try {

    const {
        id_mesa,
        pedidos
    } = req.body.pedido;
    const resDetail = await pedidoModel.create({
        id_mesa,
        pedidos
    });
    await mesaModel.findOneAndUpdate(
        { _id:id_mesa},
        { estado:1},
      );
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
      id_mesa,
    pedidos
    } = req.body.pedido;
    let resDetail
 

     resDetail = await pedidoModel.findOneAndUpdate(
      { _id},
      { id_mesa,
        pedidos},
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
    const resDetail =  await pedidoModel.findOneAndDelete({ id_mesa:_id });
    await mesaModel.findOneAndUpdate(
        { _id},
        { estado:0},
      );
    const listAll =  await mesaModel.find({});
    await req.io.emit('mesas', listAll);
    res.send({ data: _id });
  } catch (e) {
    httpError(res, e);
  }
};

module.exports = { getItems, getItem, createItem,updateItem, deleteItem };
