const mongoose = require('mongoose');
const egresoSchema = new mongoose.Schema({
    id_cajero:{
        type: String,
        required: true
    },
    caja:{
        type: Object,
        required: true
    },
    nombre_egreso:{
        type: String,
        required: true

    },
    detalle_egreso:{
        type: String,

    },
    observacion_egreso:{
        type: String,

    },
    cantidad_egreso:{
        type: Number,
        required: true
    },
    estado:{
        type: Number,
        default: 0
    }
},{
    timestamps:true,
    versionKey: false
})
module.exports= mongoose.model('egreso', egresoSchema)