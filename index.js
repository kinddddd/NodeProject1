const express = require('express');
require('dotenv').config();
const moviesRoutes = require('./src/api/models/Movies.routes.js');
const cinemaRoutes = require('./src/api/models/Cinema.routes.js');


const router = express.Router();

const connectDb = require('./src/utils/db')

const PORT = process.env.PORT;
const server = express();

connectDb();



server.use(express.json());
server.use(express.urlencoded({ extended: false }));


server.use('/movies', moviesRoutes);

server.use('/cinemas', cinemaRoutes);






server.listen(PORT, () => {
    console.log(`El servidor se ha iniciado en http://localhost:${PORT}`);
});