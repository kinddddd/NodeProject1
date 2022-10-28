const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cinemaSchema = new Schema(
    {
        name:{type: String, required: true},
        location:{type: String, required: true},
        movies:[{type: mongoose.Types.ObjectId, ref: 'movies'}], //* Movies hace referencia a la colección
     },
    {
        timestamps: true
    }
);

const Cinema = mongoose.model('cinemas', cinemaSchema );

module.exports = Cinema;