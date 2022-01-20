const mongoose = require('mongoose');
const cajaSchema = new mongoose.Schema({


    id_cajero:{
        type: String,
        required: true
    },
    caja_chica:{
        type: Number,


    },
    cierre_caja:{
        type: Number,


    },
    cantidad_egreso:{
        type: Number,

    },
    cantidad_ingreso:{
        type: Number,

    },
    cantidad_intereses:{
        type: Number,

    },
    cantidad_descuentos:{
        type: Number,

    },
    cantidad_impuestos:{
        type: Number,

    },
    cantidad_efectivo:{
        type: Number,

    },
    cantidad_transferencia:{
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
