const { httpError } = require("../helpers/handleError");
const categoriaCocinero = require("../models/categoriaCocinero");
const platoModel = require("../models/plato");


const getItems = async (req, res) => {
 
  try {
    const id_cocinero =  req.user_token._id;
    let cocineroCategorias = await categoriaCocinero.findOne({id_cocinero});
    
    if(cocineroCategorias!=undefined){
        res.send(cocineroCategorias);
    }else{
         cocineroCategorias = await categoriaCocinero.create({id_cocinero,categorias_seleccionadas:[]});
        res.send(cocineroCategorias);
    }
   
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
    } = req.body.categoria;
    const resDetail = await categoriaModel.create({
        nombre_categoria,
        descripcion_categoria,
    });
    const listAll = await categoriaModel.find({});
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
      categorias_seleccionadas
    } = req.body;
    let resDetail


     resDetail = await categoriaCocinero.findOneAndUpdate(
      { _id},
      {categorias_seleccionadas},
    );
    console.log(resDetail);
  res.send(resDetail);
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



        const listAllPlatos =  await platoModel.find({});
        await req.io.emit('platos', listAllPlatos);

    const listAll =  await categoriaModel.find({});
    await req.io.emit('categorias', listAll);
    res.send({ data: _id });
  } catch (e) {
    httpError(res, e);
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
