const mongoose = require('mongoose');
const categoriaSchema = new mongoose.Schema({
    nombre_categoria:{
        type: String,
        required: true
    },
    descripcion_categoria:{
        type: String

    },
    estado_categoria:{
        type: Number,
        required: true,
        default: 0
    },
},{
    timestamps:true,
    versionKey: false
})
module.exports= mongoose.model('categoria', categoriaSchema)