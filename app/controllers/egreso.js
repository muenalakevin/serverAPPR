const { httpError } = require("../helpers/handleError");
const egresoModel = require("../models/egreso");


const getEgresoFecha = async (req, res) => {
  try {
    const {
      fechaInicio,
      fechaFin,
  } = req.body;
  let listAll
   
      listAll = await egresoModel.find({ createdAt:{$gte : fechaInicio,$lte :fechaFin}});
      /* listAll = await cajaModel.find({ createdAt:{$gte : fechaInicio,$lte :fechaFin}}); */
      res.send(listAll);


    //.io.emit("new-message", { content: req.body.content });
  
  } catch (e) {
    httpError(res, e);
  }
};


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



module.exports = { getEgresoFecha,createItem,getItemsCaja};
