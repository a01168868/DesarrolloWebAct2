//Models
const mongoose = require('mongoose');

//Definir esquema
const PlayListSchema = mongoose.Schema({
    titulo: {
        type: String,
        minlength: [5, 'Min length is 5 characters'],
        maxlength: [50, 'Max length is 50 characters'],
        required: true
    },
    descripcion: {
        type: String,
        minlength: [10, 'Min length is 10 characters'],
        maxlength: [250, 'Max length is 250 characters'],
        required: true
    },
    canciones: [],
    libros: []
}, { collection: 'playlist' });

//Crear modelo
module.exports = mongoose.model('PlayList', PlayListSchema);