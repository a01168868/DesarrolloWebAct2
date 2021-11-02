const express = require("express");
const mongoose = require("mongoose");
const cancionRoutes = require("./routes/cancion");
const libroRoutes = require("./routes/libro");
const playlistRoutes = require("./routes/playlist");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/cancion", cancionRoutes);
app.use("/libro", libroRoutes);
app.use("/playlist", playlistRoutes);

mongoose.connect('mongodb://vmanager:tecCEM@54.173.202.133:27017/testdb?authSource=admin')
    .then(() => {
        app.listen(8081, () => console.log("Escuchando en puerto 8081"));
    })
    .catch(err => console.log(err))