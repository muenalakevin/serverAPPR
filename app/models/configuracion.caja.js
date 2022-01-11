const mongoose = require('mongoose');
const configuracionCajaSchema = new mongoose.Schema({
    iva:{
        type: Number,
        required: true
    },
    metodosPago:{
        type: Array,
        required: true
    },
    cierreCaja:{
        type: Number,
        required: true
    },
    colorFlechas:{
        type: Object,
        required: true
    },
    colorAgregarCliente:{
        type: Object,
        required: true
    },
    colorEditarCliente:{
        type: Object,
        required: true
    },
    colorPagar:{
        type: Object,
        required: true
    }
},{
    timestamps:true,
    versionKey: false
})
module.exports= mongoose.model('configuracionCaja', configuracionCajaSchema)