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
        cantidad_egreso,
        cantidad_ingreso,
        cantidad_descuentos,
        estado,
    } = req.body.caja;
    const id_cajero =  req.user_token._id;
    const resDetail = await cajaModel.create({
        id_cajero,
        caja_chica,
        cantidad_egreso,
        cantidad_ingreso,
        cantidad_descuentos,
        estado,
    });

    res.send( resDetail );
  } catch (e) {
    httpError(res, e);
  }
};



module.exports = { createItem,getCaja};
