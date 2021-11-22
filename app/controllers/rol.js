const { httpError } = require("../helpers/handleError");
const rolModel = require("../models/rol");

const getItems = async (req, res) => {
  try {
    const listAll = await rolModel.find({});
    
    res.send(listAll);
  } catch (e) {
    httpError(res, e);
  }
};

const getItem = async (req, res) => {
    try {
      const { _id } = req.body;
      const usuario = await rolModel.findOne({ _id });
        res.send({ data: usuario });
      } catch (e) {
        httpError(res, e);
      }
};

const createItem = async (req, res) => {
  try {
    const {
      nombre_rol,
      codigo_rol
    } = req.body;
    const resDetail = await rolModel.create({
        nombre_rol,
        codigo_rol
    });
    res.send({ data: resDetail });
  } catch (e) {
    httpError(res, e);
  }
};

const updateItem = async (req, res) => {
  try {
    const { id } = req.body;
    const {
        nombre_rol,
        codigo_rol
    } = req.body;

    const resDetail = await rolModel.findOneAndUpdate(
      { _id: id },
      { nombre_rol,codigo_rol}
    );
    res.send({ data: resDetail });
  } catch (e) {
    httpError(res, e);
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.body;
    const resDetail = await rolModel.deleteOne({ _id: id });
    res.send({ data: resDetail });
  } catch (e) {
    httpError(res, e);
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
