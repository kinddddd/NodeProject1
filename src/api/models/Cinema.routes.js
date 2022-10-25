const express = require('express');
const Cinema = require('./Cinema.js');

const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const newCinema = new Cinema({
            name: req.body.name,
            location: req.body.location,
            movies: []
        });

        const createdCinema = await newCinema.save();
        return res.status(201).json(createdCinema);

    } catch (error) {
        return res.status(500).json('No se ha podido crear el cine correctamente');
    }
});


router.get('/', async (req, res) => {
    try {
        
        const allCinemas = await Cinema.find().populate('movies');
        console.log(allCinemas);
        return res.status(200).json(allCinemas);

    } catch (error) {
        return res.status(500).json('No se encontraron todos los cines');
    }
});


router.get('/:id', async (req, res) => {
    try {
        
        const id = req.params.id;
        const cinemaToFind = await Cinema.findById(id).populate('movies');
        console.log(cinemaToFind);
        return res.status(200).json(cinemaToFind);

    } catch (error) {
        return res.status(500).json('No se encontró el cine por su id');
    }
});


router.get('/name/:name', async (req, res) => {
    try {
        
        const {name} = req.params;
        const nameToFind = await Cinema.find({ name: name }).populate('movies');
        console.log(nameToFind);
        return res.status(200).json(nameToFind);

    } catch (error) {
        return res.status(500).json('No se encontró el cine por su nombre');
    }
});




router.delete('/delete/:id', async (req, res) => {
    try {

        const {id} = req.params
        await Cinema.findByIdAndDelete(id).populate('movies');
        return res.status(200).json('Cinema deleted');

    } catch (error) {
        return res.status(500).json('No se ha podido borrar el cine correctamente');
    }
});


router.put('/edit/:id', async (req, res) => {
    try {
        const cinemaId = req.params.id;
        console.log(cinemaId);
        const {movieId} = req.body;
        console.log(movieId);
        const cinemaUpdated = await Cinema.findByIdAndUpdate(
            cinemaId,
            {$push: {movies: movieId}},
            {new: true}
        ).populate('movies');
        return res.status(200).json(cinemaUpdated);
        
    } catch (error) {
        return res.status(500).json('No se ha podido editar correctamente el cine');
    }
});





module.exports = router;