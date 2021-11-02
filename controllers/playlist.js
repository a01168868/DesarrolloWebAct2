const PlayList = require("../models/playlist.js");
const Cancion = require("../models/cancion.js");
const Libro = require("../models/libro.js");
const mongoose = require("mongoose");


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

    { }

    //Obtiene datos completos de cada elemento
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


/*
POST: localhost:8081/playlist/agregaElementos
{
    "id_objetivo": "616e5b2f70ca56d448dd3437",
    "elementos":[
        {
            "_id":["616df9c1bc51f241c7869426","616e05037968f7173d365610"],
            "tipo":"Canción"
        },
        {
            "_id":["616e10d260f623a12d92ab79","616e0fcd3dcf8dd05e517f34"],
            "tipo":"Libro"
        },
        {
            "_id":["616e05817968f7173d365614"],
            "tipo":"Canción"
        }
    ]
}
*/
//Recibe en "_id" un arreglo de id's
//Puede recibir varios paquetes de canciones y libros en el mismo body
//Permite duplicados (hay canciones que quiero escuchar +2 veces)
//Los nuevos elementos son agregados al final de canciones o libros
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

                if (canciones.size > 0 || canciones.size > 0) {
                    if (canciones.size > 0) {
                        const nuevasCanciones = await Cancion.find({ '_id': { $in: Array.from(canciones) } });
                        if (nuevasCanciones && nuevasCanciones.length > 0) {
                            playlist.canciones.push(nuevasCanciones);
                        }
                    }

                    if (libros.size > 0) {
                        const nuevosLibros = await Libro.find({ '_id': { $in: Array.from(libros) } });
                        if (nuevosLibros && nuevosLibros.length > 0) {
                            playlist.libros.push(nuevosLibros);
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


/*
POST: localhost:8081/playlist/quitaElementos
{
    "id_objetivo": "616e5b2f70ca56d448dd3437",
    "elementos":[
        {
            "_id":["616df9c1bc51f241c7869426","616e05037968f7173d365610"],
            "tipo":"Canción"
        },
        {
            "_id":["616e10d260f623a12d92ab79","616e0fcd3dcf8dd05e517f34"],
            "tipo":"Libro"
        },
        {
            "_id":["616e05817968f7173d365614","616e05037968f7173d365610"],
            "tipo":"Canción"
        }
    ]
}
*/
//Quita todos los elementos existentes en array Elementos, incluso si están repetidos
exports.quitarElementosPlayList = async (req, res) => {
    var playlist = {};
    var cancionesAr = [];
    var librosAr = [];
    var cancionesEliminadas = 0;
    var librosEliminados = 0;
    var cancionesIds = [];
    var librosIds = [];
    var error = 0;
    //Obtiene los elementos existentes
    try {
        const { id } = req.params;
        playlist = await PlayList.findById(id);
    } catch (err) { //¿Cómo seguir con este tipo de error? Intentar con un id de playlist inválido
        error = 1;
        console.log(err);
        res.json({ operacion: "Incorrecta" });
        res.end();
    }

    //Obtiene listas de Ids a quitar
    for (var index = 0; index < req.body.elementos.length && error == 0; index++) {
        var elemento = req.body.elementos[index]._id;
        var tipo = req.body.elementos[index].tipo;
        for (var i = 0; i < elemento.length; i++) {
            if (tipo == "Canción") {
                cancionesIds.push(elemento[i]);
            } else if (tipo == "Libro") {
                librosIds.push(elemento[i]);
            } else {
                error = 1;
            }
        }
    }

    //Recorre los elementos existentes y guarda los elementos que no se quitan
    var id = "";
    var index = 0;
    for (var i = 0; i < playlist.canciones.length && error == 0; i++) {
        id = playlist.canciones[i]._id.toString();
        index = cancionesIds.indexOf(id);
        if (index === -1) {
            cancionesAr.push(playlist.canciones[i]);
        } else {
            cancionesIds.splice(index, 1);
            cancionesEliminadas++;
        }
    }
    for (var i = 0; i < playlist.libros.length && error == 0; i++) {
        id = playlist.libros[i]._id.toString();
        index = librosIds.indexOf(id);
        if (index === -1) {
            librosAr.push(playlist.libros[i]);
        } else {
            librosIds.splice(index, 1);
            librosEliminados++;
        }
    }

    //Si se eliminaron todos los solicitados
    if (cancionesIds.length == 0 && librosIds == 0) {
        try {
            await PlayList.findByIdAndUpdate(req.body.id_objetivo,
                {
                    "canciones": cancionesAr,
                    "libros": librosAr
                }
            );
            console.log("Cambio realizado");
            res.json({
                operacion: "Correcta",
                mensaje: "Se eliminaron " + cancionesEliminadas + " canciones y " +
                    librosEliminados + " libros."
            });
        } catch (err) {
            console.log(err);
            res.json({
                operacion: "Incorrecta",
                error: "Error al guardar cambios."
            });
        }
    } else {
        error = 1;
        res.json({
            operacion: "Incorrecta",
            error: "No existe elemento o elementos en esta PlayList"
        });
    }
}