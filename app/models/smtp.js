const mongoose = require('mongoose');
const smtpSchema = new mongoose.Schema({
    servidor:{
        type: String,
    },
    usuario:{
        type: String,
    },
    contrasenia:{
        type: String,
    },
    puerto:{
        type: String,
    }
},{
    timestamps:true,
    versionKey: false
})
module.exports= mongoose.model('smtp', smtpSchema)