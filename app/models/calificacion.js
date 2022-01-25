const mongoose = require('mongoose');
const calificacionSchema = new mongoose.Schema({


    calificacion:{
        type: Number,
        required: true
    },
},{
    timestamps:true,
    versionKey: false
})
module.exports= mongoose.model('calificacion', calificacionSchema)
