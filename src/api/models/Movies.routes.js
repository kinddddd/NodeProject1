const express = require('express');
const Movie = require('./Movie.js');
const upload = require('../../middlewares/file')

const router = express.Router();

router.get('/', async(req, res) => {
 try {   
    const allMovies = await Movie.find();
    console.log(allMovies);
    return res.status(200).json(allMovies);

} catch(error) {
    return res.status(500).json('Error en el servidor');
}
});


router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const movieToFind = await Movie.findById(id);
        console.log(movieToFind);
        return res.status(200).json(movieToFind);
    } catch (error) {
        return res.status(500).json('No se encontró la película por id');
    }
});


router.get('/title/:title', async (req, res) => {
    const {title} = req.params;
    try {
        const titleToFind = await Movie.findOne({ title: title });
        console.log(titleToFind);
        return res.status(200).json(titleToFind);
    } catch (error) {
        return res.status(500).json('No se encontró la película por título');
    }
});



router.get('/genre/:genre', async (req, res) => {
    const {genre} = req.params;
    try {
        const genreToFind = await Movie.find({ genre: genre });
        console.log(genreToFind);
        return res.status(200).json(genreToFind);
    } catch (error) {
        return res.status(500).json('No se encontró la película por género');
    }
});



router.get('/year/:year', async (req, res) => {
    const {year} = req.params;
    try {
        const yearToFind = await Movie.find({ year: { $gte:year } });
        console.log(yearToFind);
        return res.status(200).json(yearToFind);
    } catch (error) {
        return res.status(500).json('No se encontró la película por año');
    }
});


router.post('/create', upload.single('img'), async (req, res) => {
    try {
        let imagen;
        if (req.file) {
            imagen = req.file.path;
        } else {
            imagen = req.body.img;
        }
        
        const newMovie = new Movie({
            title: req.body.title,
            director: req.body.director,
            year: req.body.year,
            img: imagen,
            genre: req.body.genre
        });


        const createdMovie = await newMovie.save();
        return res.status(201).json(createdMovie);


    } catch (error) {
        return res.status(500).json('No se ha podido crear la película correctamente');
    }
});


router.delete('/delete/:id', async (req, res) => {

    try {
        
        const {id} = req.params;
        await Movie.findByIdAndDelete(id);
        return res.status(200).json('Character deleted');

    } catch (error) {
        return res.status(500).json('No se ha podido eliminar correctamente la película');
    }

});


router.put('/edit/:id', async (req, res) => {
    try {
        
        const { id } = req.params;
        const movieModify = new Movie(req.body);
        movieModify._id = id;
        const movieUpdated = await Movie.findByIdAndUpdate(id, movieModify);
        return res.status(200).json(movieUpdated);

    } catch (error) {
        return res.status(500).json('No se ha podido editar la película correctamente');
    }
});




module.exports = router;