const mongoose = require('mongoose');
const usuario_rolSchema = new mongoose.Schema({
    id_usuario:{
        type: String,
        required: true
    },
    id_rol:{
        type: String,
        required: true,
    }
},{
    timestamps:true,
    versionKey: false
})
module.exports= mongoose.model('usuario_rol', usuario_rolSchema)