const Libro = require("../models/libro.js");
const mongoose = require("mongoose");

exports.postAgregarLibro = async (req, res) => {
    const libro = new Libro(req.body);
    libro._id = new mongoose.Types.ObjectId();
    try {
        await libro.save();
        console.log(libro);
        console.log("Libro Registrado");
        res.status(200).json({ entity: libro });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Ocurrió un error al intenar crear el libro" });
    }
}

// GET: localhost:8081/libro/
exports.getObtenerLibros = async (req, res) => {
    try {
        const libros = await Libro.find();
        if (libros) {
            console.log(libros);
            res.status(200).json({ Libros: libros });
        }
    } catch (err) {
        console.log(`LibroController | getObtenerLibros | ERROR: ${err.message}`);
        res.status(500).json({ message: `Ocurrio un error al obtener los libros` });
    }
}

// GET: localhost:8081/libro/:id
exports.getObtenerLibro = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            const libro = await Libro.findById(id);
            if (libro) {
                res.status(200).json({ entity: libro });
            } else {
                res.status(404).json({ message: `No se encontró ningún libro con el id: ${id}` });
            }
        } else {
            res.status(422).json({ message: `El id es requerido para hacer la busqueda` });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: `Ocurrio un error al obtener el libro` });
    }
}

exports.actualizarLibro = async (req, res) => {
    try {
        const { id } = req.params
        const libro = await Libro.findById(id);
        if (id) {
            if (libro) {
                await Libro.findByIdAndUpdate(id,
                    {
                        "titulo": req.body.titulo,
                        "descripcion": req.body.descripcion,
                        "autor": req.body.autor,
                        "genero": req.body.genero,
                        "anio": req.body.anio,
                        "paginas": req.body.paginas
                    }
                );
                const libroActualizado = await Libro.findById(id);
                res.status(200).json({ entity: libroActualizado });
            } else {
                console.log(`LibroController | actualizarLibro | Not Found id: ${id}`)
                res.status(404).json({ message: `No se encontró ningún libro con el id: ${id}` });
            }
        } else {
            console.log(`LibroController | actualizarLibro | Not Found id: ${id}`)
            res.status(422).json({ message: `El id es requerido para hacer la busqueda` });
        }
    } catch (err) {
        console.log(`LibroController | actualizarLibro | ERROR: ${err}`);
        res.status(500).json({ message: `Ocurrio un error al actualizar el libro` });
    }
}


/*
POST: localhost:8081/libro/:id
*/
exports.deleteLibro = async (req, res) => {
    try {
        const { id } = req.params
        const libro = await Libro.findById(id);
        if (id) {
            if (libro) {
                await Libro.findByIdAndRemove(id);
                console.log("LibroController | deleteLibro | Success")
                res.status(200).json({ entity: libro });
            } else {
                console.log(`LibroController | deleteLibro | Not Found id: ${id}`)
                res.status(404).json({ message: `No se encontró ningún libro con el id: ${id}` });
            }
        } else {
            console.log(`LibroController | actualizarLibro | Not Found id: ${id}`)
            res.status(422).json({ message: `El id es requerido para hacer la busqueda` });
        }
    } catch (err) {
        console.log(`LibroController | deleteLibro | ERROR: ${err}`);
        res.status(500).json({ message: `Ocurrio un error al eliminar el libro` });
    }
}


/*

Pendientes 18 Octubre:
    - Validación de tipos de datos
    - Validación en tamaño de los datos
    - Validación en Json de actualiza (que existan los campos a modificar y que no se agreguen más en body)
    - Validación en campos al crear
*/