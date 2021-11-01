//Models
const mongoose=require('mongoose');

//Definir esquema
const LibroSchema=mongoose.Schema({
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
    paginas:Number,
    anio:Number,
},{collection:'libro'});

//Crear modelo
module.exports=mongoose.model('Libro',LibroSchema);