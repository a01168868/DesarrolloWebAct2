//Models
const mongoose = require('mongoose');

//Definir esquema
const CancionSchema = mongoose.Schema({
    titulo: {
        type: String,
        minlength: [5, 'Min length is 5 characters'],
        maxlength: [50, 'Max length is 50 characters'],
        required: true
    },
    autor: {
        type: String,
        minlength: [3, 'Min length is 3 characters'],
        maxlength: [250, 'Max length is 250 characters'],
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