const { httpError } = require("../helpers/handleError");
const egresoModel = require("../models/egreso");


const getItemsCaja = async (req, res) => {
  const  _id  = req.params._id;
  try {
    const listAll = await egresoModel.find({caja:_id});

    //.io.emit("new-message", { content: req.body.content });
    res.send(listAll);
  } catch (e) {
    httpError(res, e);
  }
};


const createItem = async (req, res) => {
  try {

    const {
      caja,
        nombre_egreso,
        detalle_egreso,
        observacion_egreso,
        cantidad_egreso,
        estado,
    } = req.body.egreso;
    const id_cajero =  req.user_token._id;
    const resDetail = await egresoModel.create({
      caja,
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



module.exports = { createItem,getItemsCaja};
