//RUTAS
const router = require('express').Router();
const libroController = require('../controllers/libro');
const Validator = require('../middlewares/Validator');

router.post('/', Validator('libro'), libroController.agregarLibro);
router.get("/", libroController.obtenerLibros);
router.get("/:id", libroController.obtenerLibro);
router.put("/edit/:id", libroController.actualizarLibro);
router.delete("/:id", libroController.eliminarLibro);


module.exports = router;