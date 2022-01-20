const { httpError } = require("../helpers/handleError");
const configuracionMeseroModel = require("../models/configuracion.mesero");
const configuracionCajaModel = require("../models/configuracion.caja");
const configuracionEstiloModel = require("../models/configuracion.estilo");
const platoModel = require("../models/plato");


const getConfiguracionCaja = async (req, res) => {
 
  try {

    let configuracionCaja = await configuracionCajaModel.findOne();
    if(configuracionCaja!=undefined){
        res.send(configuracionCaja);
    }else{
      configuracionCaja = await configuracionCajaModel.create({
          iva:12,
          checkIVA:false,
          metodosPago:[{nombre:"Efectivo",porcentaje:0,descuentoIncremento:false,valor:0,estado:0}],
          descuentosIntereses:[{nombre:"Ninguno",porcentaje:0,descuentoIncremento:false,valor:0,estado:0}],
          cierreCaja:1,
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
            meseroEdit:false
        });
        res.send(configuracionMesero);
    }
   
  } catch (e) {
    httpError(res, e);
  }
};
const getConfiguracionEstilo = async (req, res) => {
 
  try {

    let configuracionEstilo = await configuracionEstiloModel.findOne();
    
    if(configuracionEstilo!=undefined){
        res.send(configuracionEstilo);
    }else{
        configuracionEstilo = await configuracionEstiloModel.create({
            colorAplicacion:{check:false,color: "#ffb13c"},
            colorSatisfaccion:{check:false,color: "#28a745"},
            colorSatisfaccionMedia:{check:false,color: "#ffc107"},
            colorDisatisfaccion:{check:false,color: "#dc3545"},
            colorFueraTiempo:{check:false,color: "#343a40"},
            colorOcupada:{check:false,color: "#6c757d"},
            colorDisponible:{check:false,color: "#0d6efd"},
        });
        res.send(configuracionEstilo);
    }
   
  } catch (e) {
    httpError(res, e);
  }
};
const updateConfiguracionCaja = async (req, res) => {
  try {
    const {
      iva,
      checkIVA,
      metodosPago,
      descuentosIntereses,
      cierreCaja,
    } = req.body;
    let resDetail

console.log(req.body);
     resDetail = await configuracionCajaModel.findOneAndUpdate(
      { },
      { iva,
        checkIVA,
        metodosPago,
        descuentosIntereses,
        cierreCaja,
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
      meseroEdit
    } = req.body;
    let resDetail


     resDetail = await configuracionMeseroModel.findOneAndUpdate(
      { },
      {satisfaccionAdecuada,
        satisfaccionMedia,
        disatisfaccion,
      colorOcupada,
      colorDisponible,
        meseroEdit},
    );

  res.send(resDetail);
  } catch (e) {
    httpError(res, e);
  }
};
const updateConfiguracioEstilo = async (req, res) => {
  try {

    const {
      colorAplicacion,
        colorSatisfaccion,
        colorSatisfaccionMedia,
        colorDisatisfaccion,
        colorFueraTiempo,
      colorOcupada,
      colorDisponible,
    } = req.body;
    let resDetail


     resDetail = await configuracionEstiloModel.findOneAndUpdate(
      { },
      {
        colorAplicacion,
        colorSatisfaccion,
        colorSatisfaccionMedia,
        colorDisatisfaccion,
        colorFueraTiempo,
      colorOcupada,
      colorDisponible,},
    );
    let configuracionEstilo = await configuracionEstiloModel.findOne();
  req.io.emit('configuracionEstilo', configuracionEstilo);
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

module.exports = {getConfiguracionEstilo, getConfiguracionCaja,getConfiguracionMesero,updateConfiguracioEstilo,updateConfiguracionMesero, updateConfiguracionCaja, getItem, createItem, deleteItem };
