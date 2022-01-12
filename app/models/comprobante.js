const mongoose = require('mongoose');
const comprobanteSchema = new mongoose.Schema({
    caja_comprobante:{
        type: Object,
        required: true
    },
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
    iva_comprobante:{
        type: Number,
        required: true
    },
    detalle_comprobante:{
        type: Object,
        required: true
    },
    
    subTotal_comprobante:{
        type: Number,
        required: true
    },
    subTotalConDescunto_comprobante:{
        type: Number,
        required: true
    },
    subTotalIva_comprobante:{
        type: Number,
        required: true
    },
    descuento_comprobante:{
        type: Number,
        required: true
    },
    interes_comprobante:{
        type: Number,
        required: true
    },
    total_comprobante:{
        type: Number,
        required: true
    },
    metodoPago_comprobante:{
        type: Object,
        required: true
    },
},{
    timestamps:true,
    versionKey: false
})
module.exports= mongoose.model('comprobante', comprobanteSchema)