const Joi = require('joi');

const libroSchema = Joi.object({
    titulo : Joi.string().min(5).max(50).required(),
    descripcion: Joi.string().min(10).max(250).required(),
    autor: Joi.string().min(3).max(250).required(),
    genero: Joi.string().min(0),
    paginas: Joi.number().min(0),
    anio: Joi.number().min(0),
});

module.exports = libroSchema;