//RUTAS
const router=require("express").Router();
const cancionController=require("../controllers/cancion");

router.post('/',cancionController.agregarCancion);
router.get("/",cancionController.obtenerCanciones);
router.get("/:id",cancionController.obtenerCancion);
router.put("/edit/:id",cancionController.actualizarCancion);
router.delete("/:id",cancionController.eliminarCancion);

module.exports=router;