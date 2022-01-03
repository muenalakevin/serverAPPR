const mongoose = require('mongoose');
const platoSchema = new mongoose.Schema({
    nombre_plato:{
        type: String,
        required: true
    },
    descripcion_plato:{
        type: String,
        required: true,

    },
    receta_plato:{
        type: String,
        required: true,

    },
    precio_plato:{
        type: String,
        required: true,

    },
    categorias_plato:[{
        type: [String]
    }],
    estado_plato:{
        type: Number,
        required: true,
        default: 0
    },
},{
    timestamps:true,
    versionKey: false
})
module.exports= mongoose.model('plato', platoSchema)