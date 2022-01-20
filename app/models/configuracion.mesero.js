const mongoose = require('mongoose');
const configuracionMeseroSchema = new mongoose.Schema({
    satisfaccionAdecuada:{
        type: Number,
        required: true
    },
    satisfaccionMedia:{
        type: Number,
        required: true
    },
    disatisfaccion:{
        type: Number,
        required: true
    },
    

    meseroEdit:{
        type: Boolean,
        required: true,
        default: false
    },
},{
    timestamps:true,
    versionKey: false
})
module.exports= mongoose.model('configuracionMesero', configuracionMeseroSchema)