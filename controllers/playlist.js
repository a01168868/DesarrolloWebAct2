const PlayList = require("../models/playlist.js");
const Cancion = require("../models/cancion.js");
const Libro = require("../models/libro.js");
const { ObjectId } = require('mongodb');


exports.obtenerPlayLists = async (req, res) => {
    try {
        const playlist = await PlayList.find();
        console.log("PlaylistController | obtenerPlayLists | Success");
        res.status(200).json({ PlayLists: playlist });
    } catch (err) {
        console.log(`PlaylistController | obtenerPlayLists | ERROR: ${err}`);
        res.status(500).json({ message: `Ocurrio un error al obtenr las playlists` });
    }
}


exports.obtenerPlayList = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            const playlist = await PlayList.findById(id);
            if (playlist) {
                console.log("PlaylistController | obtenerPlayList | Success");
                res.status(200).json({ entity: playlist });
            } else {
                res.status(404).json({ message: `No se encontró ninguna playlist con el id: ${id}` });
            }
        } else {
            console.log("PlaylistController | obtenerPlayList | Bad Request");
            res.status(422).json({ message: `El id es requerido para hacer la busqueda` });
        }
    } catch (err) {
        console.log(`PlaylistController | obtenerPlayList | ERROR: ${err.message}`);
        res.status(500).json({ message: `Ocurrio un error al obtener la playlist` });
    }
}


exports.agregarPlayList = async (req, res) => {
    const el = req.body.elementos;
    const error = 0;
    var canciones = [];
    var cancionesAr = [];
    var libros = [];
    var librosAr = [];

    try {
        for (let i = 0; i < el.length; i++) {
            if (el[i].tipo == "Canción") {
                canciones = await Cancion.find({ _id: { $in: el[i]._id } });
                cancionesAr = cancionesAr.concat(
                    Object.keys(canciones).map(key => canciones[key])
                );
            } else if (el[i].tipo == "Libro") {
                libros = await Libro.find({ _id: { $in: el[i]._id } });
                librosAr = librosAr.concat(
                    Object.keys(libros).map(key => libros[key])
                );
            } else {
                error = 1;
            }
        }
        if (error == 0) {
            const { titulo, descripcion } = req.body;

            if (!titulo || titulo.length < 5) {
                console.log("PlaylistController | agregarPlayList | Bad Request");
                res.status(422).json({ message: `El titulo es requerido` });
            }
            else if (!descripcion || descripcion.length < 10) {
                console.log("PlaylistController | agregarPlayList | Bad Request");
                res.status(422).json({ message: `La descripcion es requerida` });
            }
            else {
                const playlist = new PlayList(
                    {
                        "titulo": titulo,
                        "descripcion": descripcion,
                        "canciones": canciones,
                        "libros": libros
                    }
                );
                await playlist.save((err, result) => {
                    if (err) throw err;
                    console.log("PlaylistController | agregarPlayList | Success | Entity:", result);
                    res.status(200).send({ entity: result });
                });
            }
        } else {
            console.log(error);
            res.status(422).json({ message: `Ocurrio un error agregar la playlist` });
        }
    } catch (err) {
        console.log(`PlaylistController | agregarPlayList | ERROR: ${err.message}`);
        res.status(500).json({ message: `Ocurrio un error agregar la playlist` });
    }
}


exports.actualizarPlayList = async (req, res) => {
    try {
        const { id } = req.params
        if (id) {
            const playlist = await PlayList.findById(id);
            if (playlist) {
                const { titulo, descripcion } = req.body;
                if (!titulo || titulo.length < 5) {
                    console.log("PlaylistController | actualizarPlayList | Bad Request");
                    res.status(422).json({ message: `El titulo es requerido` });
                }
                else if (!descripcion || descripcion.length < 10) {
                    console.log("PlaylistController | actualizarPlayList | Bad Request");
                    res.status(422).json({ message: `La descripcion es requerida` });
                }
                else {
                    PlayList.findByIdAndUpdate(id,
                        {
                            "titulo": titulo,
                            "descripcion": descripcion
                        },
                        { new: true },
                        (err, result) => {
                            if (err) { throw err };
                            console.log("PlaylistController | actualizarPlayList | Success");
                            res.status(200).json({ entity: result });
                        });
                }
            } else {
                console.log(`PlaylistController | actualizarPlayList | Not Found id: ${id}`)
                res.status(404).json({ message: `No se encontró ninguna playlist con el id: ${id}` });
            }
        } else {
            console.log(`PlaylistController | actualizarPlayList | Not Found id: ${id}`)
            res.status(422).json({ message: `El id es requerido para hacer la busqueda` });
        }
    } catch (err) {
        console.log(`PlaylistController | actualizarPlayList | ERROR: ${err}`);
        res.status(500).json({ message: `Ocurrio un error al actualizar la playlist` });
    }
}


exports.eliminarPlayList = async (req, res) => {
    try {
        const { id } = req.params
        const playlist = await PlayList.findById(id);
        if (id) {
            if (playlist) {
                await PlayList.findByIdAndRemove(id);
                console.log("PlaylistController | eliminarPlayList | Success")
                res.status(200).json({ entity: playlist });
            } else {
                console.log(`PlaylistController | eliminarPlayList | Not Found id: ${id}`)
                res.status(404).json({ message: `No se encontró ninguna playlist con el id: ${id}` });
            }
        } else {
            console.log(`PlaylistController | eliminarPlayList | Not Found id: ${id}`)
            res.status(422).json({ message: `El id es requerido para hacer la búsqueda` });
        }
    } catch (err) {
        console.log(`PlaylistController | eliminarPlayList | ERROR: ${err.message}`);
        res.status(500).json({ message: `Ocurrio un error al eliminar la playlist` });
    }
}


exports.agregarElementosPlayList = async (req, res) => {
    try {
        const { id } = req.params;
        const playlist = await PlayList.findById(id);
        if (playlist) {
            const { elementos } = req.body;
            if (elementos && elementos.length > 0) {
                let canciones = new Set();
                let libros = new Set();

                elementos.forEach(item => {
                    if (item.tipo.toLowerCase() === "canción" || item.tipo.toLowerCase === "cancion") {
                        canciones.add(item._id);
                    }
                    else if (item.tipo.toLowerCase() === "libro") {
                        libros.add(item._id);
                    }
                });

                if (canciones.size > 0 || libros.size > 0) {
                    if (canciones.size > 0) {
                        const nuevasCanciones = await Cancion.find({ '_id': { $in: Array.from(canciones) } });
                        if (nuevasCanciones && nuevasCanciones.length > 0) {
                            nuevasCanciones.forEach(cancion => {
                                playlist.canciones.push(cancion);
                            });
                        }
                    }

                    if (libros.size > 0) {
                        const nuevosLibros = await Libro.find({ '_id': { $in: Array.from(libros) } });
                        if (nuevosLibros && nuevosLibros.length > 0) {
                            nuevosLibros.forEach(libro => {
                                playlist.libros.push(libro);
                            })
                        }
                    }

                    await playlist.save((err, result) => {
                        if (err) {
                            console.error("Update elements of playlist", err);
                            throw err;
                        };
                        console.log("PlaylistController | agregarElementosPlayList | Success");
                        res.status(200).json({ entity: result });
                    })
                } else {
                    console.log(`PlaylistController | agregarElementosPlayList | Success | Without changes`);
                    res.status(200).json({ entity: playlist });
                }
            } else {
                console.log(`PlaylistController | agregarElementosPlayList | Bad Request`);
                res.status(400).json({ message: "No se encontraron elementos en el request" });
            }
        } else {
            console.log(`PlaylistController | agregarElementosPlayList | NotFound`);
            res.status(404).json({ message: `No se enocntró la plylist con id:${id}` });
        }
    } catch (err) {
        console.log(`PlaylistController | agregarElementosPlayList | ERROR: ${err.message}`);
        res.status(500).json({ message: `Ocurrio un error al eliminar la canción` });
    }
}


exports.removerElementosPlayList = async (req, res) => {
    try {
        const { id } = req.params;
        const playlist = await PlayList.findById(id);
        if (playlist) {
            const { elementos } = req.body;
            let hasChanged = false;
            if (elementos && elementos.length > 0) {
                elementos.forEach(item => {
                    if (item.tipo.toLowerCase() === "canción" || item.tipo.toLowerCase === "cancion") {
                        const cancionToRemove = playlist.canciones.find(e => e._id == item._id)
                        if (cancionToRemove) {
                            hasChanged = true;
                            playlist.canciones.pull(cancionToRemove);
                        }
                    }
                    else if (item.tipo.toLowerCase() === "libro") {
                        const libroToRemove = playlist.libros.find(e => e._id == item._id)
                        if (libroToRemove) {
                            hasChanged = true;
                            playlist.libros.pull(libroToRemove);
                        }
                    }
                });

                if (hasChanged) {
                    await playlist.save((err, result) => {
                        if (err) {
                            console.error("Update elements of playlist", err);
                            throw err;
                        };
                        console.log("PlaylistController | removerElementosPlayList | Success");
                        res.status(200).json({ entity: result });
                    })
                } else {
                    console.log(`PlaylistController | removerElementosPlayList | Success | Without changes`);
                    res.status(200).json({ entity: playlist });
                }
            } else {
                console.log(`PlaylistController | removerElementosPlayList | Bad Request`);
                res.status(400).json({ message: "No se encontraron elementos en el request" });
            }
        } else {
            console.log(`PlaylistController | removerElementosPlayList | NotFound`);
            res.status(404).json({ message: `No se enocntró la plylist con id:${id}` });
        }
    } catch (err) {
        console.log(`PlaylistController | removerElementosPlayList | ERROR: ${err.message}`);
        res.status(500).json({ message: `Ocurrio un error al eliminar la canción` });
    }
}