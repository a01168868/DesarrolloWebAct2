const Cancion=require("../models/cancion.js");
const mongoose=require("mongoose");

/*
POST: localhost:8081/cancion/agregar
{
    "titulo": "Esta es la primera canción",
    "descripcion": "Esta es una descripción de prueba ",
    "autor": "Miguel Torres",
    "genero": "Metalcore Compulsivo Vegetariano Obligatorio",
    "anio": 2021,
    "minutos": 4,
    "segundos": 32
}
*/
exports.postAgregarCancion=async(req,res)=>{
    const cancion=new Cancion(req.body);
    cancion._id=new mongoose.Types.ObjectId();
    try{
        //Agregar documento a la colección
        await cancion.save();
        console.log(cancion);
        console.log("Canción Registrada");
        res.send({operacion:"Correcta"});
    }catch(err){
        console.log(err);
        res.send({operacion:"Incorrecta :("});
    }
}

// GET: localhost:8081/cancion/obtenerTodo
exports.getObtenerCanciones=async(req,res)=>{
    const cancion=await Cancion.find();
    console.log(cancion);
    res.json(cancion);
}

// GET: localhost:8081/cancion/obtener/616df9c1bc51f241c7869426
exports.getObtenerCancion=async(req,res)=>{
    try{
        const cancion=await Cancion.findById(req.params.id);
        console.log("FindById Exitoso");
        res.json(cancion);
    }catch(err){
        console.log(err);
        res.json({operacion: "Incorrecta"});
    }
}


/*
POST: localhost:8081/cancion/actualizar
{
    "id_objetivo": "616e00a3d6e979e7c2f1a460",
    "titulo": "Canción modificada",
    "descripcion": "Esta es una descripción de prueba con descripción modificada :D",
    "autor": "Miguel Torres",
    "genero": "Metalcore Compulsivo Vegetariano Obligatorio Repulsivo",
    "anio": 2020,
    "minutos": 2,
    "segundos": 45
}
*/
exports.postActualizarCancion=async(req,res)=>{
    try{
        await Cancion.findByIdAndUpdate(req.body.id_objetivo,
            {
                "titulo"         :      req.body.titulo,
                "descripcion"    :      req.body.descripcion,
                "autor"          :      req.body.autor,
                "genero"         :      req.body.genero,
                "anio"           :      req.body.anio,
                "minutos"        :      req.body.minutos,
                "segundos"       :      req.body.segundos
            }
        );
        console.log("Cambio realizado");
        res.json({operacion: "Correcta"});
    }catch(err){
        console.log(err);
        res.json({operacion: "Incorrecta"});
    }
}


/*
POST: localhost:8081/cancion/borrar
{
    "id_objetivo": "616e00a3d6e979e7c2f1a460"
}
*/
exports.postBorrarCancion=async(req,res)=>{
    try{
        await Cancion.findByIdAndRemove(req.body.id_objetivo);
        console.log("Canción Eliminada");
        res.json({operacion: "Correcta"});
    }catch(err){
        console.log(err);
        res.json({operacion: "Incorrecta"});
    }
}




/*

Pendientes 18 Octubre:
    - Validación de tipos de datos
    - Validación en tamaño de los datos
    - Validación en Json de actualiza (que existan los campos a modificar y que no se agreguen más en body)
    - Validación en campos al crear
*/