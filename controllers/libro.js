const Libro=require("../models/libro.js");
const mongoose=require("mongoose");

/*
POST: localhost:8081/libro/agregar
{
    "titulo": "Libro de cultura independiente a lo largo de los años",
    "descripcion": "Esta es una descripción de prueba ",
    "autor": "Miguel Torres",
    "genero": "Literatura subpostmoderna vegetariana",
    "anio": 2021,
    "paginas": 234
}
*/
exports.postAgregarLibro=async(req,res)=>{
    const libro=new Libro(req.body);
    libro._id=new mongoose.Types.ObjectId();
    try{
        //Agregar documento a la colección
        await libro.save();
        console.log(libro);
        console.log("Libro Registrado");
        res.send({operacion:"Correcta"});
    }catch(err){
        console.log(err);
        res.send({operacion:"Incorrecta :("});
    }
}

// GET: localhost:8081/libro/obtenerTodo
exports.getObtenerLibros=async(req,res)=>{
    const libro=await Libro.find();
    console.log(libro);
    res.json(libro);
}

// GET: localhost:8081/libro/obtener/616e10d260f623a12d92ab79
exports.getObtenerLibro=async(req,res)=>{
    try{
        const libro=await Libro.findById(req.params.id);
        console.log("FindById Exitoso");
        res.json(libro);
    }catch(err){
        console.log(err);
        res.json({operacion: "Incorrecta"});
    }
}


/*
POST: localhost:8081/libro/actualizar
{
    "id_objetivo": "616e10d260f623a12d92ab79",
    "titulo": "Libro Modificado",
    "descripcion": "Esta es una descripción de prueba con descripción modificada :D",
    "autor": "Miguel Torres",
    "genero": "Metalcore Compulsivo Vegetariano Obligatorio Repulsivo",
    "anio": 2020,
    "paginas": 234
}
*/
exports.postActualizarLibro=async(req,res)=>{
    try{
        await Libro.findByIdAndUpdate(req.body.id_objetivo,
            {
                "titulo"         :      req.body.titulo,
                "descripcion"    :      req.body.descripcion,
                "autor"          :      req.body.autor,
                "genero"         :      req.body.genero,
                "anio"           :      req.body.anio,
                "paginas"        :      req.body.paginas
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
POST: localhost:8081/libro/borrar
{
    "id_objetivo": "616e10d260f623a12d92ab79"
}
*/
exports.postBorrarLibro=async(req,res)=>{
    try{
        await Libro.findByIdAndRemove(req.body.id_objetivo);
        console.log("Libro Eliminado");
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