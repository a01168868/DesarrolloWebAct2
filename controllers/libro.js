const Libro = require("../models/libro.js");


exports.agregarLibro = async (req, res, next) => {
    const libro = new Libro(req.body);
    try {
        await libro.save((err, result) => {
            if (err) {
                console.error(err);
                throw err;
            }
            if (result) {
                console.log(`LibroController | agregarLibro | Success`);
                res.status(200).json({ entity: result });
            }
        });
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Ocurrió un error al intenar crear el libro" });
    }
}


exports.obtenerLibros = async (req, res) => {
    try {
        const libros = await Libro.find();
        console.info(`LibroController | obtenerLibros | Success`);
        res.status(200).json({ Libros: libros });
    } catch (err) {
        console.error(`LibroController | obtenerLibros | ERROR: ${err.message}`);
        res.status(500).json({ message: `Ocurrio un error al obtener los libros` });
    }
}


exports.obtenerLibro = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            const libro = await Libro.findById(id);
            if (libro) {
                console.info(`LibroController | obtenerLibro | Success`);
                res.status(200).json({ entity: libro });
            } else {
                console.error(`LibroController | obtenerLibro | Not Found`);
                res.status(404).json({ message: `No se encontró ningún libro con el id: ${id}` });
            }
        } else {
            res.status(422).json({ message: `El id es requerido para hacer la busqueda` });
        }
    } catch (err) {
        console.error(`LibroController | getObtenerLibro | ERROR: ${err.message}`);
        res.status(500).json({ message: `Ocurrio un error al obtener el libro` });
    }
}


exports.actualizarLibro = async (req, res) => {
    try {
        const { id } = req.params
        if (id) {
            const libro = await Libro.findById(id);
            if (libro) {
                Libro.findByIdAndUpdate(id, 
                    req.body,
                    { new: true },
                    (err, result) => {
                        if (err) {
                            console.error(err);
                            throw err;
                        }
                        console.info(`LibroController | actualizarLibro | Success`);
                        res.status(200).json({ entity: result });
                    });
            } else {
                console.log(`LibroController | actualizarLibro | Not Found id: ${id}`)
                res.status(404).json({ message: `No se encontró ningún libro con el id: ${id}` });
            }
        } else {
            console.error(`LibroController | actualizarLibro | Bad Request`)
            res.status(400).json({ message: `El id es requerido para hacer la busqueda` });
        }
    } catch (err) {
        console.error(`LibroController | actualizarLibro | ERROR: ${err}`);
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