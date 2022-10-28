const express = require('express');
require('dotenv').config();
const passport = require('passport');
require('./src/auth/passport.js');
const cors = require('cors');
const userRouter = require('./src/api/models/user.routes.js');
const moviesRoutes = require('./src/api/models/Movies.routes.js');
const cinemaRoutes = require('./src/api/models/Cinema.routes.js');
const connectDb = require('./src/utils/db')
const cloudinary = require('cloudinary').v2;

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

connectDb();


const PORT = process.env.PORT;
const server = express();

server.use(cors());

server.use(express.json());
server.use(express.urlencoded({ extended: false }));


server.use('/movies', moviesRoutes);

server.use('/cinemas', cinemaRoutes);


server.use((error, req, res, next) => {
    return res.status(error.status || 500).json(error.message || 'Unexpected error');
  });
  

server.listen(PORT, () => {
    console.log(`El servidor se ha iniciado en http://localhost:${PORT}`);
});