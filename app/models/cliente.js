const mongoose = require('mongoose');
const clienteSchema = new mongoose.Schema({
    nombre_cliente:{
        type: String,
        required: true
    },
    apellido_cliente:{
        type: String,
        required: true
    },
    cedRuc_cliente:{
        type: String,
        required: true
    },
    correo_cliente:{
        type: String,
        required: true
    },
    direccion_cliente:{
        type: String,
        required: true
    },
    telefono_cliente:{
        type: String,
        required: true
    }
},{
    timestamps:true,
    versionKey: false
})
module.exports= mongoose.model('cliente', clienteSchema)