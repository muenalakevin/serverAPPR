const mongoose = require('mongoose');
const categoriaSchema = new mongoose.Schema({
    nombre_categoria:{
        type: String,
        required: true
    },
    descripcion_categoria:{
        type: String,
        required: true,

    }
},{
    timestamps:true,
    versionKey: false
})
module.exports= mongoose.model('categoria', categoriaSchema)