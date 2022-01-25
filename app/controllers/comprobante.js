const { httpError } = require("../helpers/handleError");
const comprobanteModel = require("../models/comprobante");
const rolModel = require("../models/rol");
const bcrypt = require("bcrypt")


const getItems = async (req, res) => {
 
  try {
    const listAll = await comprobanteModel.find({});

    //.io.emit("new-message", { content: req.body.content });
    res.send(listAll);
  } catch (e) {
    httpError(res, e);
  }
};

const getItemsCaja = async (req, res) => {
  const  _id  = req.params._id;
  try {
    const listAll = await comprobanteModel.find({caja_comprobante:_id});

    //.io.emit("new-message", { content: req.body.content });
    res.send(listAll);
  } catch (e) {
    httpError(res, e);
  }
};

const searchUsername = async (req, res) => {
  try {
    const { comprobante_comprobante   } = req.body;

    const comprobante = await comprobanteModel.findOne({ comprobante_comprobante});
if(comprobante.id!=null){
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
    const { correo_comprobante   } = req.body;

    const comprobante = await comprobanteModel.findOne({ correo_comprobante});

if(comprobante.id!=null){
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
      const comprobante = await comprobanteModel.findOne({ _id });
        res.send({ data: comprobante });
      } catch (e) {
        httpError(res, e);
      }
};



const createItem = async (req, res) => {
  try {      
    const {
        caja_comprobante,
        pedido_comprobante,
        comprobante_comprobante,
        cliente_comprobante,
        fecha_comprobante,
        iva_comprobante,
        detalle_comprobante,
        subTotal_comprobante,
        subTotalConDescunto_comprobante,
        subTotalIva_comprobante,
        descuento_comprobante,
        interes_comprobante,
        total_comprobante,
        metodoPago_comprobante,
        descuentoInteres_comprobante
    } = req.body.comprobante;
    const resDetail = await comprobanteModel.create({
      caja_comprobante,
      pedido_comprobante,
      comprobante_comprobante,
      cliente_comprobante,
      fecha_comprobante,
      iva_comprobante,
      detalle_comprobante,
      subTotal_comprobante,
      subTotalConDescunto_comprobante,
      subTotalIva_comprobante,
      descuento_comprobante,
      interes_comprobante,
      total_comprobante,
      metodoPago_comprobante,
      descuentoInteres_comprobante
    });
  /*   const listAll = await comprobanteModel.find({});
    req.io.emit('comprobantes', listAll); */
    res.send(resDetail);
    req.io.emit('calificacion');
  } catch (e) {
    httpError(res, e);
  }
};





const updateItem = async (req, res) => {
  try {

    const {
      _id,
      caja_comprobante,
      pedido_comprobante,
      comprobante_comprobante,
      cliente_comprobante,
      fecha_comprobante,
      iva_comprobante,
      detalle_comprobante,
      subTotal_comprobante,
      subTotalConDescunto_comprobante,
      subTotalIva_comprobante,
      descuento_comprobante,
      interes_comprobante,
      total_comprobante,
      metodoPago_comprobante,
      descuentoInteres_comprobante
    } = req.body.comprobante;
    let resDetail

    if(contrasenia_comprobante==null){
     resDetail = await comprobanteModel.findOneAndUpdate(
      { _id},
      { caja_comprobante,
        pedido_comprobante,
        comprobante_comprobante,
        cliente_comprobante,
        fecha_comprobante,
        iva_comprobante,
        detalle_comprobante,
        subTotal_comprobante,
        subTotalConDescunto_comprobante,
        subTotalIva_comprobante,
        descuento_comprobante,
        interes_comprobante,
        total_comprobante,
        metodoPago_comprobante,
        descuentoInteres_comprobante },
    );
    
   
  }else{
    
    
    const salt = await bcrypt.genSaltSync(11);
    const hash =await bcrypt.hashSync(contrasenia_comprobante, salt);

     resDetail = await comprobanteModel.findOneAndUpdate(
      { _id },
      { nombre_comprobante, comprobante_comprobante,contrasenia_comprobante: hash, correo_comprobante,rol_comprobante }
    );

  }
  const listAll = await comprobanteModel.find({});
  req.io.emit('comprobantes', listAll);
  res.send({ data: resDetail });
  } catch (e) {
    httpError(res, e);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const resDetail =  await comprobanteModel.findOneAndDelete({ _id});
    const listAll =  await comprobanteModel.find({});
    await req.io.emit('comprobantes', listAll);
    res.send({ data: _id });
  } catch (e) {
    httpError(res, e);
  }
};

module.exports = { getItems,getItemsCaja, getItem, searchEmail,searchUsername,createItem, updateItem, deleteItem };
