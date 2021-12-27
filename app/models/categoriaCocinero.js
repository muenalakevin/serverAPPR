const mongoose = require('mongoose');
const categoriaCocineroSchema = new mongoose.Schema({
    id_cocinero:{
        type: String,
        required: true
    },
    categorias_seleccionadas:[{
        type: [String]
    }]
},{
    timestamps:true,
    versionKey: false
})
module.exports= mongoose.model('categoriaCocinero', categoriaCocineroSchema)