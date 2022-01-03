const mongoose = require('mongoose');
const comprobanteSchema = new mongoose.Schema({
    pedido_comprobante:{
        type: Object,
        required: true
    },
    cliente_comprobante:{
        type: Object,
        required: true

    },
    fecha_comprobante:{
        type: Date,
        required: true
    },
    total_comprobante:{
        type: Number,
        required: true
    },
    iva_comprobante:{
        type: Number,
        required: true
    },
    detalle_comprobante:{
        type: Object,
        required: true
    }
},{
    timestamps:true,
    versionKey: false
})
module.exports= mongoose.model('comprobante', comprobanteSchema)