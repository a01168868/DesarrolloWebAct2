//RUTAS
const router = require("express").Router();
const playlistController = require("../controllers/playlist");

router.post('/', playlistController.agregarPlayList);
router.get("/", playlistController.obtenerPlayLists);
router.get("/:id", playlistController.obtenerPlayList);
router.put("/edit/:id", playlistController.actualizarPlayList);
router.delete("/:id", playlistController.eliminarPlayList);
router.post("/add", playlistController.agregarElementosPlayList);
router.post("/remove", playlistController.quitarElementosPlayList);

module.exports = router;