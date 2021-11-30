const mongoose = require('mongoose');
const mesaSchema = new mongoose.Schema({
    nombre_mesa:{
        type: String,
        required: true
    },
    descripcion_mesa:{
        type: String,

    }
},{
    timestamps:true,
    versionKey: false
})
module.exports= mongoose.model('mesa', mesaSchema)