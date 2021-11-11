const mongoose = require('mongoose');
const rolSchema = new mongoose.Schema({
    nombre_rol:{
        type: String,
        required: true
    },
    codigo_rol:{
        type: String,
        required: true,
        unique:true
    }
},{
    timestamps:true,
    versionKey: false
})
module.exports= mongoose.model('rol', rolSchema)