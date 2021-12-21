const { httpError } = require("../helpers/handleError");
const pedidoModel = require("../models/pedido");
const mesaModel = require("../models/mesa");
const path = require('path')
const  fs = require('fs-extra');
const getItems = async (req, res) => {
 
  try {
    const listAll = await pedidoModel.find({estado:1});

    //.io.emit("new-message", { content: req.body.content });
    res.send(listAll);
  } catch (e) {
    httpError(res, e);
  }
};

const getItem = async (req, res) => {
    try {
      const  _id  = req.params._id;
      const pedidos = await pedidoModel.find({ });
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
        pedidos,
        observacion
    } = req.body.pedido;
    const id_mesero =  req.user_token._id;
    const resDetail = await pedidoModel.create({
        id_mesa,
        pedidos,
        id_mesero,
        observacion
    });
    await mesaModel.findOneAndUpdate(
        { _id:id_mesa},
        { estado:1},
      );

    res.send(resDetail );
    const mesas = await mesaModel.find({});
    req.io.emit('mesas', mesas);
    const pedidosAll = await pedidoModel.find({estado:1});
    req.io.emit('pedidos', pedidosAll);
   
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
      await pedidoModel.findOneAndUpdate(
      { _id},
      { id_mesa,
        pedidos},
    );
    const mesas = await mesaModel.find({});
    req.io.emit('mesas', mesas);
    const pedidosAll = await pedidoModel.find({estado:1});
    req.io.emit('pedidos', pedidosAll);

    res.sendStatus(204);
  } catch (e) {
    httpError(res, e);
  }
};



const enviarPedido = async (req, res) => {
  try {
    const {
      _id,
      id_mesa
    } = req.body.pedido;
    
     await pedidoModel.findOneAndUpdate(
      { _id},
      { estado:1,
        horaDeEnvio:Date.now()
      },
    );
     await mesaModel.findOneAndUpdate(
      { _id:id_mesa},
      { estado:2},
    );

    const mesas = await mesaModel.find({});
    req.io.emit('mesas', mesas);
    const pedidos = await pedidoModel.find({estado:1});
    req.io.emit('pedidos', pedidos);
    res.sendStatus(204)
  } catch (e) {
    httpError(res, e);
  }
};

const deleteItem = async (req, res, next) => {
  try {

    const { _id } = req.params;
    await mesaModel.findOneAndUpdate(
      { _id},
      { estado:0},
    );
    await pedidoModel.findOneAndUpdate(
      { id_mesa:_id},
      { estado:-1},);


      const mesas = await mesaModel.find({});
      req.io.emit('mesas', mesas);
      const pedidos = await pedidoModel.find({estado:1});
      req.io.emit('pedidos', pedidos);
    res.send({_id} );
  } catch (e) {
    httpError(res, e);
  }
};

module.exports = { getItems, getItem,enviarPedido, createItem,updateItem, deleteItem };
