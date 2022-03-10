const { httpError } = require("../helpers/handleError");
const cajaModel = require("../models/caja");


const getCajaFecha = async (req, res) => {
  try {
    const {
      fechaInicio,
      fechaFin,
      cocinero
  } = req.body;
  let listAll
  console.log(req.body);
    if(cocinero != ""){
      listAll = await cajaModel.find({ createdAt:{$gte : fechaInicio,$lte :fechaFin},id_cocinero:cocinero});
      res.send(listAll);
    }else{
      listAll = await cajaModel.find({ createdAt:{$gte : fechaInicio,$lte :fechaFin}});
      /* listAll = await cajaModel.find({ createdAt:{$gte : fechaInicio,$lte :fechaFin}}); */
      res.send(listAll);
    }

    //.io.emit("new-message", { content: req.body.content });
  
  } catch (e) {
    httpError(res, e);
  }
};


const getCajas = async (req, res) => {
 
  try {
    let caja = await cajaModel.find({});
    res.send(caja);
   
  } catch (e) {
    httpError(res, e);
  }
};


const getReporteCaja = async (req, res) => {
 
  try {
    console.log(req.params)
  const {id} =  req.params;
    let caja = await cajaModel.findOne({_id:id});
    const fs = require("fs");
    const PDFDocument = require("pdfkit-table");  

// create document
let doc = await new PDFDocument({ margin: 30, size: 'A4' });
// file name
await doc.pipe(fs.createWriteStream("./document.pdf"));

// table


const table = { 
  title: '',
  headers: ["Detalle", "Valor"],
  datas: [ /* complex data */ ],
  rows: [
    ["Caja de apertura",new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(caja.caja_chica)],
    ["Total de egreso",new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(caja.cantidad_egreso)],
    ["CTotal de ingreso",new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(caja.cantidad_ingreso)],
    ["Total de recargos",new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(caja.cantidad_intereses)],
    ["Total de descuentos",new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(caja.cantidad_descuentos)],
    ["Total de efectivo",new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(caja.cantidad_efectivo)],
    ["Total de transferencias",new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(caja.cantidad_transferencia)],
    ["Cierre de caja",new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(caja.cierre_caja)],
    ["Sobrante o faltante de caja",new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(caja.cierre_caja -(caja.caja_chica +  caja.cantidad_efectivo))  ],
,
  ],
}
// the magic
await doc.table( table, { /* options / }, () => { / callback */ } );
// doc.table() is a Promise to async/await function 

// if your run express.js server
// to show PDF on navigator
// doc.pipe(res);

// done!
doc.pipe(res);
await doc.end();
const path = require('path');

//b64 =  fs.readFileSync(path.join(__dirname, '/../../document.pdf'))
//res.send(b64)
    //res.send(doc);
   
  } catch (e) {
    httpError(res, e);
  }
};


  const getCaja = async (req, res) => {
 
    try {
    const id_cajero =  req.user_token._id;
      let caja = await cajaModel.findOne({id_cajero:id_cajero,estado:1});
      res.send(caja);
     
    } catch (e) {
      httpError(res, e);
    }
  };


const createItem = async (req, res) => {
  try {
    const {
        caja_chica,
        cierre_caja,
        cantidad_egreso,
        cantidad_ingreso,
        cantidad_descuentos,
        cantidad_intereses,
        cantidad_impuestos,
        cantidad_efectivo,
        cantidad_transferencia,
        estado,
    } = req.body.caja;
    const id_cajero =  req.user_token._id;
    const resDetail = await cajaModel.create({
        id_cajero,
        caja_chica,
        cierre_caja,
        cantidad_egreso,
        cantidad_ingreso,
        cantidad_descuentos,
        cantidad_intereses,
        cantidad_impuestos,
        cantidad_efectivo,
        cantidad_transferencia,
        estado
    });

    res.send( resDetail );
  } catch (e) {
    httpError(res, e);
  }
};
const updateItem = async (req, res) => {
  try {
    const {
      _id,
        caja_chica,
        cierre_caja,
        cantidad_egreso,
        cantidad_ingreso,
        cantidad_descuentos,
        cantidad_intereses,
        cantidad_impuestos,
        cantidad_efectivo,
        cantidad_transferencia,
        estado,
    } = req.body.caja;
    const id_cajero =  req.user_token._id;
    const resDetail = await cajaModel.findOneAndUpdate(
      { _id},{
        id_cajero,
        caja_chica,
        cierre_caja,
        cantidad_ingreso,
        cantidad_egreso,
        cantidad_descuentos,
        cantidad_intereses,
        cantidad_impuestos,
        cantidad_efectivo,
        cantidad_transferencia,
        estado
    });
    const caja = await cajaModel.findOne({_id});
    res.send( caja );
  } catch (e) {
    httpError(res, e);
  }
};



module.exports = { getCajas,getReporteCaja,createItem,getCajaFecha,getCaja,updateItem};
