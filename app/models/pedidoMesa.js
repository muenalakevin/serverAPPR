const mongoose = require('mongoose');
const PlatoModel = require("./plato");
const pedidoMesaSchema = new mongoose.Schema({
    plato:{
        type: String,
        required: true
    },
    cantidad_pedido:{
        type: Number,

    }
})
module.exports= mongoose.model('pedidoMesa', pedidoMesaSchema)