const mongoose = require('mongoose');
const configuracionEstiloSchema = new mongoose.Schema({

    colorAplicacion:{
        type: Object,
        required: true
    },
    colorSatisfaccion:{
        type: Object,
        required: true
    },
    colorSatisfaccionMedia:{
        type: Object,
        required: true
    },
    colorDisatisfaccion:{
        type: Object,
        required: true
    },
    colorFueraTiempo:{
        type: Object,
        required: true
    },
    colorOcupada:{
        type: Object,
        required: true
    },
    colorDisponible:{
        type: Object,
        required: true
    },
},{
    timestamps:true,
    versionKey: false
})
module.exports= mongoose.model('configuracionEstilo', configuracionEstiloSchema)