//Models
const mongoose=require('mongoose');

//Definir esquema
const PlayListSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    titulo:{
        type:String,
        required:true
    },
    descripcion:{
        type:String,
        required:true
    },
    canciones:[],
    libros:[]
},{collection:'playlist'});

//Crear modelo
module.exports=mongoose.model('PlayList',PlayListSchema);