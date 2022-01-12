const { httpError } = require("../helpers/handleError");
const cajaModel = require("../models/caja");


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
        estado
    });

    res.send( resDetail );
  } catch (e) {
    httpError(res, e);
  }
};



module.exports = { createItem,getCaja,updateItem};
