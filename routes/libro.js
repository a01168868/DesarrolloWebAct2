//RUTAS
const router = require("express").Router();
const libroController = require("../controllers/libro");

router.post('/', libroController.postAgregarLibro);
router.get("/", libroController.getObtenerLibros);
router.get("/:id", libroController.getObtenerLibro);
router.post("/edit/:id", libroController.actualizarLibro);
router.delete("/:id", libroController.deleteLibro);


module.exports = router;