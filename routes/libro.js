//RUTAS
const router = require("express").Router();
const libroController = require("../controllers/libro");

router.post('/', libroController.agregarLibro);
router.get("/", libroController.obtenerLibros);
router.get("/:id", libroController.obtenerLibro);
router.put("/edit/:id", libroController.actualizarLibro);
router.delete("/:id", libroController.eliminarLibro);


module.exports = router;