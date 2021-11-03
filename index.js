require('dotenv').config();
// App
const http = require('http');
const createHttpError = require('http-errors');
const mongoose = require("mongoose");

// Init Server
const express = require("express");
const app = express();
console.log("🚀 Iniciando SongsCatalog App 🚀");
const httpServer = http.createServer(app);

// Routes
const cancionRoutes = require("./routes/cancion");
const libroRoutes = require("./routes/libro");
const playlistRoutes = require("./routes/playlist");
const { message } = require('./validators/libros.validator');

// Application Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/cancion", cancionRoutes);
app.use("/libro", libroRoutes);
app.use("/playlist", playlistRoutes);

// Catch HTTP 404 
app.use((req, res, next) => {
    next(createHttpError(404));
})

// Error Handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    console.error(`Status: ${status}, Message: ${err.message}`)
    res.status(status);
    res.json({
        error: {
            status: status,
            message: err.message
        }
    })
});


mongoose.connect(process.env.MONGO_DB)
    .then(() => {
        const port = process.env.PORT || 8081;
        httpServer.listen(port, () => console.log(`Escuchando en el puerto: ${port} ✅`));
    })
    .catch(err => console.log(err))