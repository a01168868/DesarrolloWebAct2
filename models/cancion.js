//Models
const mongoose = require('mongoose');

//Definir esquema
const CancionSchema = mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    album: {
        type: String
    },
    genero: [{
        type: String
    }],
    anio: Number,
    minutos: Number,
    segundos: Number

}, { collection: 'cancion' });

//Crear modelo
module.exports = mongoose.model('Cancion', CancionSchema);