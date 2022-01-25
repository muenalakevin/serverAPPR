const { httpError } = require("../helpers/handleError");
const pedidoModel = require("../models/pedido");
const mesaModel = require("../models/mesa");
const path = require('path')
const  fs = require('fs-extra');


const getPedidosFecha = async (req, res) => {
  try {
    const {
      fechaInicio,
      fechaFin,
      tipoSeleccion,
      tipoFiltrado,
      mesero
  } = req.body;
  let listAll
    if(mesero != ""){
      listAll = await pedidoModel.find({ createdAt:{$gte : fechaInicio,$lte :fechaFin},id_mesero:mesero});
      res.send(listAll);
    }else{
      listAll = await pedidoModel.find({ createdAt:{$gte : fechaInicio,$lte :fechaFin}});
      res.send(listAll);
    }

    //.io.emit("new-message", { content: req.body.content });
  
  } catch (e) {
    httpError(res, e);
  }
};

const getItems = async (req, res) => {
  try {
    const listAll = await pedidoModel.find({estado:2});

    //.io.emit("new-message", { content: req.body.content });
    res.send(listAll);
  } catch (e) {
    httpError(res, e);
  }
};
const getItemsAll = async (req, res) => {
  try {
    const listAll = await pedidoModel.find();

    //.io.emit("new-message", { content: req.body.content });
    res.send(listAll);
  } catch (e) {
    httpError(res, e);
  }
};

const getItem = async (req, res) => {
    try {
      const  _id  = req.params._id;

      const pedido = await pedidoModel.findOne({ id_mesa:_id, estado:{$gte : 1,$lte :2} });

        res.send( pedido );
      } catch (e) {
        httpError(res, e);
      }
};

const getItem2 = async (req, res) => {
  try {
    const  _id  = req.params._id;

    const pedido = await pedidoModel.findOne({ id_mesa:_id, estado: {$gte : 1 ,$lte :2} });

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
    console.log(req.body.pedido);

    const id_mesero =  req.user_token._id;
    const resDetail = await pedidoModel.create({
        id_mesa,
        pedidos,
        id_mesero,
        observacion,
        estado:1
    }); 
    await mesaModel.findOneAndUpdate(
        { _id:id_mesa},
        { estado:2},
      );

    res.send(resDetail );
    const mesas = await mesaModel.find({});
    req.io.emit('mesas', mesas);
    const pedidosAll = await pedidoModel.find({estado:2});
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
    pedidos,
    observacion,
    estado,
    horaDeEntrega
    } = req.body.pedido;
    console.log( req.body.pedido);
      await pedidoModel.findOneAndUpdate(
      { _id},
      { id_mesa,
        pedidos,
        observacion,
        estado,
        horaDeEntrega},
    );
    const pedidosAll = await pedidoModel.find({estado:2});
    req.io.emit('pedidos', pedidosAll);

    const mesas = await mesaModel.find({});
  
    req.io.emit('mesas', mesas);


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
      { estado:2,
        horaDeEnvio:Date.now()
      },
    );
     await mesaModel.findOneAndUpdate(
      { _id:id_mesa},
      { estado:3},
    );

    const mesas = await mesaModel.find({});
    req.io.emit('mesas', mesas);
    const pedidos = await pedidoModel.find({estado:2});
    req.io.emit('pedidos', pedidos);
    res.sendStatus(204)
  } catch (e) {
    httpError(res, e);
  }
};

const deleteItem = async (req, res, next) => {
  try {

    const { id_mesa,id_pedido } = req.body;
    await mesaModel.findOneAndUpdate(
      { _id:id_mesa},
      { estado:1},
    );

    await pedidoModel.findOneAndUpdate(
      { _id:id_pedido},
      { estado:-1},);


      const mesas = await mesaModel.find({});
      req.io.emit('mesas', mesas);
      const pedidos = await pedidoModel.find({estado:2});
      req.io.emit('pedidos', pedidos);
    res.send(id_pedido );
  } catch (e) {
    httpError(res, e);
  }
};

module.exports = { getItems, getPedidosFecha,getItemsAll, getItem,enviarPedido,getItem2, createItem,updateItem, deleteItem };
