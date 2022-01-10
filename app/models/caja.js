const mongoose = require('mongoose');
const cajaSchema = new mongoose.Schema({
    id_cajero:{
        type: String,
        required: true
    },
    caja_chica:{
        type: Number,


    },
    cantidad_egreso:{
        type: Number,

    },
    cantidad_ingreso:{
        type: String,

    },
    cantidad_descuentos:{
        type: Number,

    },
    estado:{
        type: Number,
        default: 0
    }
},{
    timestamps:true,
    versionKey: false
})
module.exports= mongoose.model('caja', cajaSchema)
