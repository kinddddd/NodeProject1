const express = require('express');
require('dotenv').config();

const router = express.Router();

const connectDb = require('./src/utils/db')

const PORT = process.env.PORT;
const server = express();

connectDb();




server.listen(PORT, () => {
    console.log(`El servidor se ha iniciado en http://localhost:${PORT}`);
});