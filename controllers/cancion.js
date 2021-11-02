const Cancion = require("../models/cancion");


exports.agregarCancion = async (req, res) => {
    try {
        const cancion = new Cancion(req.body);
        await cancion.save(function (err, result) {
            if (err) throw err;
            if (result) {
                console.log("CancionController | agregarCancion | Success | Entity:", result);
                res.status(200).json({ entity: result });
            }
        });
    } catch (err) {
        console.log(`CancionController | agregarCancion | ERROR: ${err}`);
        res.status(500).json({ message: `Ocurrio un error al crear la canción` });
    }
}


exports.obtenerCanciones = async (req, res) => {
    try {
        const canciones = await Cancion.find();
        console.log("CancionController | obtenerCanciones | Success");
        res.status(200).json({ Canciones: canciones });
    } catch (err) {
        console.log(`CancionController | obtenerCanciones | ERROR: ${err}`);
        res.status(500).json({ message: `Ocurrio un error al obtener las canciones` });
    }
}


exports.obtenerCancion = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            const cancion = await Cancion.findById(id);
            if (cancion) {
                console.log("CancionController | obtenerCancion | Success");
                res.status(200).json({ entity: cancion });
            } else {
                res.status(404).json({ message: `No se encontró ninguna cancion con el id: ${id}` });
            }
        } else {
            res.status(422).json({ message: `El id es requerido para hacer la busqueda` });
        }
    } catch (err) {
        console.log(`CancionController | obtenerCancion | ERROR: ${err.message}`);
        res.status(500).json({ message: `Ocurrio un error al obtener la cancion` });
    }
}


exports.actualizarCancion = async (req, res) => {
    try {
        const { id } = req.params
        if (id) {
            const cancion = await Cancion.findById(id);
            if (cancion) {
                Cancion.findByIdAndUpdate(id,
                    {
                        "titulo": req.body.titulo,
                        "autor": req.body.autor,
                        "album": req.body.album,
                        "genero": req.body.genero,
                        "anio": req.body.anio,
                        "minutos": req.body.minutos,
                        "segundos": req.body.segundos
                    },
                    { new: true },
                    (err, result) => {
                        if (err) {
                            throw err;
                        };
                        console.log("CancionController | actualizarCancion | Success");
                        res.status(200).json({ entity: result });
                    });
            } else {
                console.log(`CancionController | actualizarCancion | Not Found id: ${id}`)
                res.status(404).json({ message: `No se encontró ninguna canción con el id: ${id}` });
            }
        } else {
            console.log(`CancionController | actualizarCancion | Not Found id: ${id}`)
            res.status(422).json({ message: `El id es requerido para hacer la busqueda` });
        }
    } catch (err) {
        console.log(`CancionController | actualizarCancion | ERROR: ${err}`);
        res.status(500).json({ message: `Ocurrio un error al actualizar la cancion` });
    }
}


exports.eliminarCancion = async (req, res) => {
    try {
        const { id } = req.params
        const cancion = await Cancion.findById(id);
        if (id) {
            if (cancion) {
                await Cancion.findByIdAndRemove(id);
                console.log("CancionController | eliminarCancion | Success")
                res.status(200).json({ entity: cancion });
            } else {
                console.log(`CancionController | eliminarCancion | Not Found id: ${id}`)
                res.status(404).json({ message: `No se encontró ninguna canción con el id: ${id}` });
            }
        } else {
            console.log(`CancionController | eliminarCancion | Not Found id: ${id}`)
            res.status(422).json({ message: `El id es requerido para hacer la búsqueda` });
        }
    } catch (err) {
        console.log(`CancionController | eliminarCancion | ERROR: ${err.message}`);
        res.status(500).json({ message: `Ocurrio un error al eliminar la canción` });
    }
}