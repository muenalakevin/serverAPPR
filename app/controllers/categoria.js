const { httpError } = require("../helpers/handleError");
const categoriaModel = require("../models/categoria");
const mesaModel = require("../models/mesa");
const platoModel = require("../models/plato");


const getItemsAdmin = async (req, res) => {
 
  try {

    const listAll = await categoriaModel.find({});

    //.io.emit("new-message", { content: req.body.content });
    res.send(listAll);
  } catch (e) {
    httpError(res, e);
  }
};
const getItems = async (req, res) => {
 
  try {

    const listAll = await categoriaModel.find({estado_plato:{$lte:1}});

    //.io.emit("new-message", { content: req.body.content });
    res.send(listAll);
  } catch (e) {
    httpError(res, e);
  }
};

const getItem = async (req, res) => {
    try {
      const { _id } = req.body;
      const usuario = await categoriaModel.findOne({ _id });
        res.send({ data: usuario });
      } catch (e) {
        httpError(res, e);
      }
};



const createItem = async (req, res) => {
  try {

    const {
        nombre_categoria,
        descripcion_categoria,
        estado_categoria
    } = req.body.categoria;
    const resDetail = await categoriaModel.create({
        nombre_categoria,
        descripcion_categoria,
        estado_categoria
    });
    const listAllAdmin = await categoriaModel.find({});
        const listAll = await categoriaModel.find({estado_categoria:{$lte:1}});
        req.io.emit('categoriasAdmin', listAllAdmin);
        req.io.emit('categorias', listAll);
    res.send({ data: resDetail });
  } catch (e) {
    httpError(res, e);
  }
};





const updateItem = async (req, res) => {
  try {

    const {
      _id,
      nombre_categoria,
        descripcion_categoria,
        estado_categoria
    } = req.body.categoria;
    let resDetail


     resDetail = await categoriaModel.findOneAndUpdate(
      { _id},
      {nombre_categoria,
        descripcion_categoria,
        estado_categoria
      },
    );
    

    const listAllAdmin = await categoriaModel.find({});
    const listAll = await categoriaModel.find({estado_categoria:{$lte:1}});
    req.io.emit('categoriasAdmin', listAllAdmin);
    req.io.emit('categorias', listAll);
  res.send({ data: resDetail });
  } catch (e) {
    httpError(res, e);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const resDetail =  await categoriaModel.findOneAndDelete({ _id});
    
    const platos = await platoModel.find({})
    await Promise.all(
    await platos.map(async plato=>{
        const newPlato = await plato.categorias_plato

        const categoriasEncontradas = await newPlato.find(  idCategoria=>idCategoria== _id)
        if(categoriasEncontradas!=undefined){
            const newCategorias = await newPlato.filter( idCategoria=>idCategoria!= _id)
            await platoModel.findOneAndUpdate(
                { _id: plato._id},
                {  categorias_plato: newCategorias},
              );
              
        }
    })
    
    )
    /* await platoModel.updateOne(
        { },
        {
            $pull : {
                categorias_plato: _id
            }
        })  */



        const listAllPlatos =  await platoModel.find({estado_plato:{$lte:1}});
        const listAllPlatosAdmin =  await platoModel.find({});
        await req.io.emit('platos', listAllPlatos);
        await req.io.emit('platosAdmin', listAllPlatosAdmin);

        const listAllAdmin = await categoriaModel.find({});
        const listAll = await categoriaModel.find({estado_categoria:{$lte:1}});
        req.io.emit('categoriasAdmin', listAllAdmin);
        req.io.emit('categorias', listAll);
    res.send({ data: _id });
  } catch (e) {
    httpError(res, e);
  }
};

module.exports = { getItemsAdmin,getItems, getItem, createItem, updateItem, deleteItem };
