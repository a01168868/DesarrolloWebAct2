//RUTAS
const router=require("express").Router();
const cancionController=require("../controllers/cancion");

router.post('/agregar',cancionController.postAgregarCancion);
router.get("/obtenerTodo",cancionController.getObtenerCanciones);
router.get("/obtener/:id",cancionController.getObtenerCancion);
router.post("/actualizar",cancionController.postActualizarCancion);
router.post("/borrar",cancionController.postBorrarCancion);

module.exports=router;