//RUTAS
const router=require("express").Router();
const playlistController=require("../controllers/playlist");

router.post('/agregar',playlistController.postAgregarPlayList);
router.get("/obtenerTodo",playlistController.getObtenerPlayLists);
router.get("/obtener/:id",playlistController.getObtenerPlayList);
router.post("/actualizar",playlistController.postActualizarPlayList);
router.post("/borrar",playlistController.postBorrarPlayList);
router.post("/agregaElementos",playlistController.postAgregarElementosPlayList);
router.post("/quitaElementos",playlistController.postQuitarElementosPlayList);

module.exports=router;