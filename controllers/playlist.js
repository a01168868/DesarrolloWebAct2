const PlayList=require("../models/playlist.js");
const Cancion=require("../models/cancion.js");
const Libro=require("../models/libro.js");
const mongoose=require("mongoose");

/*
POST: localhost:8081/playlist/agregar
{
    "titulo": "Música para el rato",
    "descripcion": "Esta es música para solo un rato",
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
exports.postAgregarPlayList=async(req,res)=>{
    const el=req.body.elementos;
    const error=0;
    var canciones=[];
    var cancionesAr=[];
    var libros=[];
    var librosAr=[];

    //Obtiene datos completos de cada elemento
    try{
        for(let i=0;i<el.length;i++){
            if(el[i].tipo=="Canción"){
                canciones= await Cancion.find({ _id: { $in: el[i]._id } });
                cancionesAr=cancionesAr.concat(
                    Object.keys(canciones).map(key => canciones[key])
                );
            }else if(el[i].tipo=="Libro"){
                libros= await Libro.find({ _id: { $in: el[i]._id } });
                librosAr=librosAr.concat(
                    Object.keys(libros).map(key => libros[key])
                );
            }else{
                error=1;
            }
        }
    }catch(err){
        console.log(err);
        error=1;
        res.json({operacion: "Incorrecta"});
    }
    if(error==0){
        const playlist=new PlayList(
            {
                "titulo"         :      req.body.titulo,
                "descripcion"    :      req.body.descripcion,
                "canciones"      :      cancionesAr,
                "libros"         :      librosAr         
            }
        );
        playlist._id=new mongoose.Types.ObjectId();
        try{
            //Agregar documento a la colección
            await playlist.save();
            console.log(playlist);
            console.log("PlayList Registrada");
            res.send({operacion:"Correcta"});
        }catch(err){
            console.log(err);
            res.send({operacion:"Incorrecta :("});
        }
    }else{
        console.log(error);
        res.send({operacion:"Incorrecta :("});
    }
}



// GET: localhost:8081/playlist/obtenerTodo
exports.getObtenerPlayLists=async(req,res)=>{
    const playlist=await PlayList.find();
    console.log(playlist);
    res.json(playlist);
}



// GET: localhost:8081/playlist/obtener/616e2782d72a66364709c5c5
exports.getObtenerPlayList=async(req,res)=>{
    try{
        const playlist=await PlayList.findById(req.params.id);
        console.log("FindById Exitoso");
        res.json(playlist);
    }catch(err){
        console.log(err);
        res.json({operacion: "Incorrecta"});
    }
}



/*
POST: localhost:8081/playlist/actualizar
{
    "id_objetivo": "616e2782d72a66364709c5c5",
    "titulo": "Modificando PlayList :D",
    "descripcion": "Esta es una asdf ificada :D"
}
*/
exports.postActualizarPlayList=async(req,res)=>{
    try{
        await PlayList.findByIdAndUpdate(req.body.id_objetivo,
            {
                "titulo"         :      req.body.titulo,
                "descripcion"    :      req.body.descripcion               
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
POST: localhost:8081/playlist/borrar
{
    "id_objetivo": "616e00a3d6e979e7c2f1a460"
}
*/
exports.postBorrarPlayList=async(req,res)=>{
    try{
        await PlayList.findByIdAndRemove(req.body.id_objetivo);
        console.log("PlayList Eliminada");
        res.json({operacion: "Correcta"});
    }catch(err){
        console.log(err);
        res.json({operacion: "Incorrecta"});
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
exports.postAgregarElementosPlayList=async(req,res)=>{
    const el=req.body.elementos;
    const error=0;
    var canciones=[];
    var cancionesAr=[];
    var libros=[];
    var librosAr=[];
    var playlist={};
    //Obtiene los elementos existentes
    try{
        playlist=await PlayList.findById(req.body.id_objetivo);
        //console.log(playlist.canciones);
    }catch(err){
        console.log(err);
        res.json({operacion: "Incorrecta"});
    }

    //Crea los elementos nuevos
    try{
        for(let i=0;i<el.length;i++){
            if(el[i].tipo=="Canción"){
                canciones= await Cancion.find({ _id: { $in: el[i]._id } });
                cancionesAr=cancionesAr.concat(
                    Object.keys(canciones).map(key => canciones[key])
                );
            }else if(el[i].tipo=="Libro"){
                libros= await Libro.find({ _id: { $in: el[i]._id } });
                librosAr=librosAr.concat(
                    Object.keys(libros).map(key => libros[key])
                );
            }else{
                error=1;
            }
        }
    }catch(err){
        console.log(err);
        error=1;
        res.json({operacion: "Incorrecta"});
    }

    cancionesAr=(playlist.canciones).concat(cancionesAr);
    librosAr=(playlist.libros).concat(librosAr);
    //Guarda los viejos con los nuevos
    if(error==0 && (cancionesAr.length>0 || librosAr.length>0)){
        try{
            await PlayList.findByIdAndUpdate(req.body.id_objetivo,
                {
                    "canciones" :      cancionesAr,
                    "libros"    :      librosAr              
                }
            );
            console.log("Cambio realizado");
            res.json({operacion: "Correcta"});
        }catch(err){
            console.log(err);
            res.json({operacion: "Incorrecta"});
        }
        

    }else{
        res.json({operacion: "Incorrecta"});
    }
    res.end();
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
exports.postQuitarElementosPlayList=async(req,res)=>{
    var playlist={};
    var cancionesAr=[];
    var librosAr=[];
    var cancionesEliminadas=0;
    var librosEliminados=0;
    var cancionesIds=[];
    var librosIds=[];
    var error=0;
    //Obtiene los elementos existentes
    try{
        playlist=await PlayList.findById(req.body.id_objetivo);
    }catch(err){ //¿Cómo seguir con este tipo de error? Intentar con un id de playlist inválido
        error=1;
        console.log(err);
        res.json({operacion: "Incorrecta"});
        res.end();
    }

    //Obtiene listas de Ids a quitar
    for(var index=0;index<req.body.elementos.length && error==0;index++){
        var elemento=req.body.elementos[index]._id;
        var tipo=req.body.elementos[index].tipo;
        for(var i=0;i<elemento.length;i++){
            if(tipo=="Canción"){
                cancionesIds.push(elemento[i]);
            }else if(tipo=="Libro"){
                librosIds.push(elemento[i]);
            }else{
                error=1;
            }
        }
    }

    //Recorre los elementos existentes y guarda los elementos que no se quitan
    var id="";
    var index=0;
    for(var i=0;i<playlist.canciones.length && error==0;i++){
        id=playlist.canciones[i]._id.toString();
        index=cancionesIds.indexOf(id);
        if( index === -1){
            cancionesAr.push(playlist.canciones[i]);
        }else{
            cancionesIds.splice(index, 1);
            cancionesEliminadas++;
        }
    }
    for(var i=0;i<playlist.libros.length && error==0;i++){
        id=playlist.libros[i]._id.toString();
        index=librosIds.indexOf(id);
        if( index === -1){
            librosAr.push(playlist.libros[i]);
        }else{
            librosIds.splice(index, 1);
            librosEliminados++;
        }
    }

    //Si se eliminaron todos los solicitados
    if(cancionesIds.length==0 && librosIds==0){
        try{
            await PlayList.findByIdAndUpdate(req.body.id_objetivo,
                {
                    "canciones" :      cancionesAr,
                    "libros"    :      librosAr              
                }
            );
            console.log("Cambio realizado");
            res.json({operacion: "Correcta",
            mensaje:"Se eliminaron "+cancionesEliminadas+" canciones y "+
            librosEliminados+" libros."});
        }catch(err){
            console.log(err);
            res.json({operacion: "Incorrecta",
            error:"Error al guardar cambios."});
        }
    }else{
        error=1;
        res.json({operacion: "Incorrecta",
        error:"No existe elemento o elementos en esta PlayList"});
    }
}


/*

Pendientes 18 Octubre:
    - Validación de tipos de datos
    - Validación en tamaño de los datos
    - Validación en Json de actualiza (que existan los campos a modificar y que no se agreguen más en body)
    - Validación en campos al crear
*/