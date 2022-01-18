const mongoose = require('mongoose');
const opcionRapidaSchema = new mongoose.Schema({
    frase_opcionRapida:{
        type: String,
        required: true
    }
},{
    timestamps:true,
    versionKey: false
})
module.exports= mongoose.model('opcionRapida', opcionRapidaSchema)