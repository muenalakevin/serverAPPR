const { httpError } = require("../helpers/handleError");
const clienteModel = require("../models/cliente");
const rolModel = require("../models/rol");
const bcrypt = require("bcrypt")


const getItems = async (req, res) => {
 
  try {
    const listAll = await clienteModel.find({});

    //.io.emit("new-message", { content: req.body.content });
    res.send(listAll);
  } catch (e) {
    httpError(res, e);
  }
};


const searchUsername = async (req, res) => {
  try {
    const { cliente_cliente   } = req.body;

    const cliente = await clienteModel.findOne({ cliente_cliente});
if(cliente.id!=null){
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
    const { correo_cliente   } = req.body;

    const cliente = await clienteModel.findOne({ correo_cliente});

if(cliente.id!=null){
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
      const cliente = await clienteModel.findOne({ _id });
        res.send({ data: cliente });
      } catch (e) {
        httpError(res, e);
      }
};



const createItem = async (req, res) => {
  try {
   
    const {
      nombre_cliente,
      apellido_cliente,
      cedRuc_cliente,
      correo_cliente,
      direccion_cliente,
      telefono_cliente,
    } = req.body.cliente;
    const resDetail = await clienteModel.create({
      nombre_cliente,
      apellido_cliente,
      cedRuc_cliente,
      correo_cliente,
      direccion_cliente,
      telefono_cliente
    });
  /*   const listAll = await clienteModel.find({});
    req.io.emit('clientes', listAll); */
    res.send(resDetail);
  } catch (e) {
    httpError(res, e);
  }
};





const updateItem = async (req, res) => {
  try {

    const {
      _id,
      nombre_cliente,
      apellido_cliente,
      cedRuc_cliente,
      correo_cliente,
      direccion_cliente,
      telefono_cliente
    } = req.body.cliente;
    let resDetail


     resDetail = await clienteModel.findOneAndUpdate(
      { _id},
      { nombre_cliente,
        apellido_cliente,
        cedRuc_cliente,
        correo_cliente,
        direccion_cliente,
        telefono_cliente},
    );
    

  const listAll = await clienteModel.find({});
  req.io.emit('clientes', listAll);
  res.send(resDetail );
  } catch (e) {
    httpError(res, e);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const resDetail =  await clienteModel.findOneAndDelete({ _id});
    const listAll =  await clienteModel.find({});
    await req.io.emit('clientes', listAll);
    res.send({ data: _id });
  } catch (e) {
    httpError(res, e);
  }
};

module.exports = { getItems, getItem, searchEmail,searchUsername,createItem, updateItem, deleteItem };
