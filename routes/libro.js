//RUTAS
const router=require("express").Router();
const libroController=require("../controllers/libro");

router.post('/agregar',libroController.postAgregarLibro);
router.get("/obtenerTodo",libroController.getObtenerLibros);
router.get("/obtener/:id",libroController.getObtenerLibro);
router.post("/actualizar",libroController.postActualizarLibro);
router.post("/borrar",libroController.postBorrarLibro);


module.exports=router;