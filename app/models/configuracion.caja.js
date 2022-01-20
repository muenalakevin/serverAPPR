const mongoose = require('mongoose');
const configuracionCajaSchema = new mongoose.Schema({
    iva:{
        type: Number,
        required: true
    },
    checkIVA:{
        type: Boolean,
        required: true
    },
    metodosPago:{
        type: Array,
        required: true
    },
    descuentosIntereses:{
        type: Array,
        required: true
    },
    cierreCaja:{
        type: Number,
        required: true
    }
},{
    timestamps:true,
    versionKey: false
})
module.exports= mongoose.model('configuracionCaja', configuracionCajaSchema)