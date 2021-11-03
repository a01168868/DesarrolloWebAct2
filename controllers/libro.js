const Libro = require("../models/libro.js");


exports.agregarLibro = async (req, res) => {
    const { titulo, descripcion, autor, genero,  anio, paginas } = req.body;
    const libro = new Libro({
        titulo,
        descripcion,
        autor,
        genero,
        anio,
        paginas
    });
    try {
        await libro.save();
        console.log(`LibroController | agregarLibro | Success`);
        res.status(200).json({ entity: libro });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Ocurrió un error al intenar crear el libro" });
    }
}


exports.obtenerLibros = async (req, res) => {
    try {
        const libros = await Libro.find();
        console.log(`LibroController | obtenerLibros | Success`);
        res.status(200).json({ Libros: libros });
    } catch (err) {
        console.log(`LibroController | obtenerLibros | ERROR: ${err.message}`);
        res.status(500).json({ message: `Ocurrio un error al obtener los libros` });
    }
}


exports.obtenerLibro = async (req, res) => {
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
        console.log(`LibroController | getObtenerLibro | ERROR: ${err.message}`);
        res.status(500).json({ message: `Ocurrio un error al obtener el libro` });
    }
}


exports.actualizarLibro = async (req, res) => {
    try {
        const { id } = req.params
        if (id) {
            const libro = await Libro.findById(id);
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


exports.eliminarLibro = async (req, res) => {
    try {
        const { id } = req.params
        const libro = await Libro.findById(id);
        if (id) {
            if (libro) {
                await Libro.findByIdAndRemove(id);
                console.log("LibroController | eliminarLibro | Success")
                res.status(200).json({ entity: libro });
            } else {
                console.log(`LibroController | eliminarLibro | Not Found id: ${id}`)
                res.status(404).json({ message: `No se encontró ningún libro con el id: ${id}` });
            }
        } else {
            console.log(`LibroController | eliminarLibro | Not Found id: ${id}`)
            res.status(422).json({ message: `El id es requerido para hacer la busqueda` });
        }
    } catch (err) {
        console.log(`LibroController | eliminarLibro | ERROR: ${err}`);
        res.status(500).json({ message: `Ocurrio un error al eliminar el libro` });
    }
}