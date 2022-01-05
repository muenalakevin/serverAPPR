const { httpError } = require("../helpers/handleError");
const configuracionMeseroModel = require("../models/configuracion.mesero");
const platoModel = require("../models/plato");


const getConfiguracionMesero = async (req, res) => {
 
  try {

    let configuracionMesero = await configuracionMeseroModel.findOne();
    
    if(configuracionMesero!=undefined){
        res.send(configuracionMesero);
    }else{
        configuracionMesero = await configuracionMeseroModel.create({
            satisfaccionAdecuada:0,
            satisfaccionMedia:0,
            disatisfaccion:0,
            colorSatisfaccion:{check:false,color: ""},
            colorSatisfaccionMedia:{check:false,color: ""},
            colorDisatisfaccion:{check:false,color: ""},
            meseroEdit:false
        });
        res.send(configuracionMesero);
    }
   
  } catch (e) {
    httpError(res, e);
  }
};

const getItem = async (req, res) => {
    try {
      const { _id } = req.body;
      const usuario = await configuracionMeseroModel.findOne({ _id });
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
    const resDetail = await configuracionMeseroModel.create({
        nombre_categoria,
        descripcion_categoria,
    });
    const listAll = await configuracionMeseroModel.find({});
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


     resDetail = await configuracionMeseroModel.findOneAndUpdate(
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
    const resDetail =  await configuracionMeseroModel.findOneAndDelete({ _id});
    
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

    const listAll =  await configuracionMesero.find({});
    await req.io.emit('categorias', listAll);
    res.send({ data: _id });
  } catch (e) {
    httpError(res, e);
  }
};

module.exports = { getConfiguracionMesero, getItem, createItem, updateItem, deleteItem };
