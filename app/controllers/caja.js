const { httpError } = require("../helpers/handleError");
const cajaModel = require("../models/caja");


const getCajaFecha = async (req, res) => {
  try {
    const {
      fechaInicio,
      fechaFin,
      tipoSeleccion,
      tipoFiltrado,
      cocinero
  } = req.body;
  let listAll
    if(cocinero != ""){
      listAll = await cajaModel.find({ createdAt:{$gte : fechaInicio,$lte :fechaFin},id_cocinero:cocinero});
      res.send(listAll);
    }else{
      listAll = await cajaModel.find({ createdAt:{$gte : fechaInicio,$lte :fechaFin}});
      /* listAll = await cajaModel.find({ createdAt:{$gte : fechaInicio,$lte :fechaFin}}); */
      res.send(listAll);
    }

    //.io.emit("new-message", { content: req.body.content });
  
  } catch (e) {
    httpError(res, e);
  }
};


const getCaja = async (req, res) => {
 
    try {
    const id_cajero =  req.user_token._id;
      let caja = await cajaModel.findOne({id_cajero:id_cajero,estado:1});
      res.send(caja);
     
    } catch (e) {
      httpError(res, e);
    }
  };


const createItem = async (req, res) => {
  try {
    const {
        caja_chica,
        cierre_caja,
        cantidad_egreso,
        cantidad_ingreso,
        cantidad_descuentos,
        cantidad_intereses,
        cantidad_impuestos,
        cantidad_efectivo,
        cantidad_transferencia,
        estado,
    } = req.body.caja;
    const id_cajero =  req.user_token._id;
    const resDetail = await cajaModel.create({
        id_cajero,
        caja_chica,
        cierre_caja,
        cantidad_egreso,
        cantidad_ingreso,
        cantidad_descuentos,
        cantidad_intereses,
        cantidad_impuestos,
        cantidad_efectivo,
        cantidad_transferencia,
        estado
    });

    res.send( resDetail );
  } catch (e) {
    httpError(res, e);
  }
};
const updateItem = async (req, res) => {
  try {
    const {
      _id,
        caja_chica,
        cierre_caja,
        cantidad_egreso,
        cantidad_ingreso,
        cantidad_descuentos,
        cantidad_intereses,
        cantidad_impuestos,
        cantidad_efectivo,
        cantidad_transferencia,
        estado,
    } = req.body.caja;
    const id_cajero =  req.user_token._id;
    const resDetail = await cajaModel.findOneAndUpdate(
      { _id},{
        id_cajero,
        caja_chica,
        cierre_caja,
        cantidad_ingreso,
        cantidad_egreso,
        cantidad_descuentos,
        cantidad_intereses,
        cantidad_impuestos,
        cantidad_efectivo,
        cantidad_transferencia,
        estado
    });

    res.send( resDetail );
  } catch (e) {
    httpError(res, e);
  }
};



module.exports = { createItem,getCajaFecha,getCaja,updateItem};
