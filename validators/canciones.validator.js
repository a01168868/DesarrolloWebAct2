const Joi = require('joi');

const cancionesSchema = Joi.object({
    titulo : Joi.string().min(5).max(50).required(),
    autor: Joi.string().min(3).max(250).required(),
    album: Joi.string().max(250),
    anio: Joi.number().min(0),
    genero: Joi.array().items(Joi.string().min(0)),
    minutos: Joi.number().min(0), 
    segundos: Joi.number().min(0)
})

module.exports = cancionesSchema;