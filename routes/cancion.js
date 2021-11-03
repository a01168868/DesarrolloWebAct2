//RUTAS
const router = require("express").Router();
const cancionController = require("../controllers/cancion");
const Validator = require('../middlewares/Validator');

router.post('/', Validator('cancion'), cancionController.agregarCancion);
router.get("/", cancionController.obtenerCanciones);
router.get("/:id", cancionController.obtenerCancion);
router.put("/edit/:id", Validator('cancion'), cancionController.actualizarCancion);
router.delete("/:id", cancionController.eliminarCancion);

module.exports = router;