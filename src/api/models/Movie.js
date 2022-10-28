const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema(
    {
    
        title:{type: String, required: true},
        director:{type: String, required: true},
        year:{type: Number, required: true},
        img:{type: String, required: true, /* default: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Stylized_uwu_emoticon.svg/1920px-Stylized_uwu_emoticon.svg.png" */},
        genre: {type: String, required: true, enum: ['Acción', 'Animación', 'Comedia romántica', 'Ciencia ficción']}
    },
    {
        timestamps: true
    }
);

const Movie = mongoose.model('movies', movieSchema );

module.exports = Movie;