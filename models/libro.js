//Models
const mongoose = require('mongoose');

//Definir esquema
const LibroSchema = mongoose.Schema({
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
    autor: {
        type: String,
        minlength: [3, 'Min length is 3 characters'],
        maxlength: [250, 'Max length is 250 characters'],
        required: true
    },
    genero: {
        type: String,
    },
    paginas: Number,
    anio: Number,
}, { collection: 'libro' });


//Crear modelo
module.exports = mongoose.model('Libro', LibroSchema);