const { httpError } = require("../helpers/handleError");
const configuracionMeseroModel = require("../models/configuracion.mesero");
const configuracionCajaModel = require("../models/configuracion.caja");
const platoModel = require("../models/plato");


const getConfiguracionCaja = async (req, res) => {
 
  try {

    let configuracionCaja = await configuracionCajaModel.findOne();
    if(configuracionCaja!=undefined){
        res.send(configuracionCaja);
    }else{
      configuracionCaja = await configuracionCajaModel.create({
          iva:12,
          metodosPago:[],
          cierreCaja:1,
          colorFlechas:{check:false,color: "#212529"},
          colorAgregarCliente:{check:false,color: "#212529"},
          colorEditarCliente:{check:false,color: "#212529"},
          colorPagar:{check:false,color: "#212529"},
        });
        res.send(configuracionCaja);
    }
   
  } catch (e) {
    httpError(res, e);
  }
};

const getConfiguracionMesero = async (req, res) => {
 
  try {

    let configuracionMesero = await configuracionMeseroModel.findOne();
    
    if(configuracionMesero!=undefined){
        res.send(configuracionMesero);
    }else{
        configuracionMesero = await configuracionMeseroModel.create({
            satisfaccionAdecuada:5,
            satisfaccionMedia:10,
            disatisfaccion:15,
            colorSatisfaccion:{check:false,color: "#28a745"},
            colorSatisfaccionMedia:{check:false,color: "#ffc107"},
            colorDisatisfaccion:{check:false,color: "#dc3545"},
            colorFueraTiempo:{check:false,color: "#343a40"},
            colorOcupada:{check:false,color: "#6c757d"},
            colorDisponible:{check:false,color: "#0d6efd"},
            meseroEdit:false
        });
        res.send(configuracionMesero);
    }
   
  } catch (e) {
    httpError(res, e);
  }
};
const updateConfiguracionCaja = async (req, res) => {
  try {
    const {
      iva,
      metodosPago,
      cierreCaja,
      colorFlechas,
      colorAgregarCliente,
      colorEditarCliente,
      colorPagar,
    } = req.body;
    let resDetail


     resDetail = await configuracionCajaModel.findOneAndUpdate(
      { },
      { iva,
        metodosPago,
        cierreCaja,
        colorFlechas,
        colorAgregarCliente,
        colorEditarCliente,
        colorPagar
      },
    );

  res.send(resDetail);
  } catch (e) {
    httpError(res, e);
  }
};
const updateConfiguracionMesero = async (req, res) => {
  try {

    const {
      satisfaccionAdecuada,
      satisfaccionMedia,
      disatisfaccion,
      colorSatisfaccion,
      colorSatisfaccionMedia,
      colorDisatisfaccion,
      colorFueraTiempo,
      colorOcupada,
      colorDisponible,
      meseroEdit
    } = req.body;
    let resDetail


     resDetail = await configuracionMeseroModel.findOneAndUpdate(
      { },
      {satisfaccionAdecuada,
        satisfaccionMedia,
        disatisfaccion,
        colorSatisfaccion,
        colorSatisfaccionMedia,
        colorDisatisfaccion,
        colorFueraTiempo,
      colorOcupada,
      colorDisponible,
        meseroEdit},
    );

  res.send(resDetail);
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

module.exports = { getConfiguracionCaja,getConfiguracionMesero,updateConfiguracionMesero, updateConfiguracionCaja, getItem, createItem, deleteItem };
