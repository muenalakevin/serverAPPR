const { httpError } = require("../helpers/handleError");
const egresoModel = require("../models/egreso");



const createItem = async (req, res) => {
  try {

    const {
        nombre_egreso,
        detalle_egreso,
        observacion_egreso,
        cantidad_egreso,
        estado,
    } = req.body.egreso;
    const id_cajero =  req.user_token._id;
    const resDetail = await egresoModel.create({
        nombre_egreso,
        id_cajero,
        detalle_egreso,
        observacion_egreso,
        cantidad_egreso,
        estado,
    });

    res.send( resDetail );
  } catch (e) {
    httpError(res, e);
  }
};



module.exports = { createItem};
