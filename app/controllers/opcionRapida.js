const { httpError } = require("../helpers/handleError");
const opcionRapidaModel = require("../models/opcionRapida");
const mesaModel = require("../models/mesa");
const platoModel = require("../models/plato");


const getItems = async (req, res) => {
 
  try {

    const listAll = await opcionRapidaModel.find({});

    //.io.emit("new-message", { content: req.body.content });
    res.send(listAll);
  } catch (e) {
    httpError(res, e);
  }
};

const getItem = async (req, res) => {
    try {
      const { _id } = req.body;
      const usuario = await opcionRapidaModel.findOne({ _id });
        res.send({ data: usuario });
      } catch (e) {
        httpError(res, e);
      }
};



const createItem = async (req, res) => {
  try {

    const {
        frase_opcionRapida,
        
    } = req.body.opcionRapida;
    const resDetail = await opcionRapidaModel.create({
        frase_opcionRapida,
        
    });
    const listAll = await opcionRapidaModel.find({});
    req.io.emit('opcionesRapidas', listAll);
    res.send({ data: resDetail });
  } catch (e) {
    httpError(res, e);
  }
};





const updateItem = async (req, res) => {
  try {

    const {
      _id,
      frase_opcionRapida,
        
    } = req.body.opcionRapida;
    let resDetail


     resDetail = await opcionRapidaModel.findOneAndUpdate(
      { _id},
      {frase_opcionRapida,
        
      },
    );
    

  const listAll = await opcionRapidaModel.find({});
  req.io.emit('opcionesRapidas', listAll);
  res.send({ data: resDetail });
  } catch (e) {
    httpError(res, e);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const resDetail =  await opcionRapidaModel.findOneAndDelete({ _id});
    
    const platos = await platoModel.find({})
    await Promise.all(
    await platos.map(async plato=>{
        const newPlato = await plato.opcionRapidas_plato

        const opcionRapidasEncontradas = await newPlato.find(  idopcionRapida=>idopcionRapida== _id)
        if(opcionRapidasEncontradas!=undefined){
            const newopcionRapidas = await newPlato.filter( idopcionRapida=>idopcionRapida!= _id)
            await platoModel.findOneAndUpdate(
                { _id: plato._id},
                {  opcionRapidas_plato: newopcionRapidas},
              );
              
        }
    })
    
    )
    /* await platoModel.updateOne(
        { },
        {
            $pull : {
                opcionRapidas_plato: _id
            }
        })  */



        const listAllPlatos =  await platoModel.find({});
        await req.io.emit('platos', listAllPlatos);

    const listAll =  await opcionRapidaModel.find({});
    await req.io.emit('opcionesRapidas', listAll);
    res.send({ data: _id });
  } catch (e) {
    httpError(res, e);
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
