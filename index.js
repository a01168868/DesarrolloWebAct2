require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cancionRoutes = require("./routes/cancion");
const libroRoutes = require("./routes/libro");
const playlistRoutes = require("./routes/playlist");

const app = express();
console.log("🚀 Iniciando SongsCatalog App 🚀");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/cancion", cancionRoutes);
app.use("/libro", libroRoutes);
app.use("/playlist", playlistRoutes);

mongoose.connect(process.env.MONGO_DB)
    .then(() => {
        const port = process.env.PORT || 8081;
        app.listen(port, () => console.log(`Escuchando en el puerto: ${port} ✅`));
    })
    .catch(err => console.log(err))