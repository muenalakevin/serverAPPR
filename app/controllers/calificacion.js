const { httpError } = require("../helpers/handleError");
const calificacionModel = require("../models/calificacion");


const getCalificaciones = async (req, res) => {
  try {

  let listAll = await calificacionModel.find({});
      res.send(listAll);

    return listAll;
    //.io.emit("new-message", { content: req.body.content });
  
  } catch (e) {
    httpError(res, e);
  }
};


const createItem = async (req, res) => {
  try {
    const {
        calificacion,
    } = req.body;
    const resDetail = await calificacionModel.create({
        calificacion,
    });

    res.send( resDetail );
  } catch (e) {
    httpError(res, e);
  }
};

module.exports = { createItem,getCalificaciones};
