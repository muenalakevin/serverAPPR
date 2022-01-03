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
    console.log(cliente);
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
    console.log(req.body.cliente);
    const {
      nombre_cliente,
      apellido_cliente,
      cedRuc_cliente,
      correo_cliente,
      direccion_cliente
    } = req.body.cliente;
    const resDetail = await clienteModel.create({
      nombre_cliente,
      apellido_cliente,
      cedRuc_cliente,
      correo_cliente,
      direccion_cliente
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
      cliente_cliente,
      contrasenia_cliente,
      correo_cliente,
      rol_cliente
    } = req.body.cliente;
    let resDetail

    if(contrasenia_cliente==null){
     resDetail = await clienteModel.findOneAndUpdate(
      { _id},
      { nombre_cliente, cliente_cliente, correo_cliente,rol_cliente },
    );
    
   
  }else{
    
    
    const salt = await bcrypt.genSaltSync(11);
    const hash =await bcrypt.hashSync(contrasenia_cliente, salt);

     resDetail = await clienteModel.findOneAndUpdate(
      { _id },
      { nombre_cliente, cliente_cliente,contrasenia_cliente: hash, correo_cliente,rol_cliente }
    );

  }
  const listAll = await clienteModel.find({});
  req.io.emit('clientes', listAll);
  res.send({ data: resDetail });
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