const mongoose = require('mongoose');
const PedidoMesa = require("./pedidoMesa");
const pedidoSchema = new mongoose.Schema({
    id_mesa:{
        type: String,
        required: true
    },
    pedidos:[{
        type: [Object]
    }]
},{
    timestamps:true,
    versionKey: false
})
module.exports= mongoose.model('pedido', pedidoSchema)

