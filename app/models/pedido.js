const mongoose = require('mongoose');
const PedidoMesa = require("./pedidoMesa");
const pedidoSchema = new mongoose.Schema({
    id_mesa:{
        type: String,
        required: true
    },
    id_mesero:{
        type: String,
        required: true
    },
    pedidos:[{
        type: [Object]
    }],
    estado:{
        type: Number,
        default: 0
    },
    horaDeEnvio:{
        type:Date
    },
    horaDeEntrega:{
        type:Date
    },
    observacion:{
        type: String
    }
},{
    timestamps:true,
    versionKey: false
})
module.exports= mongoose.model('pedido', pedidoSchema)

