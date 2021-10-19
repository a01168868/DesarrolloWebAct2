//Models
const mongoose=require('mongoose');

//Definir esquema
const CancionSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    titulo:{
        type:String,
        required:true
    },
    descripcion:{
        type:String,
        required:true
    },
    autor:{
        type: String,
    },
    genero:{
        type: String,
    },
    anio:Number,
    minutos:Number,
    segundos:Number
},{collection:'cancion'});

//Crear modelo
module.exports=mongoose.model('Cancion',CancionSchema);