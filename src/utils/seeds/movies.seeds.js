const mongoose = require('mongoose');
const Movie = require('../../api/models/Movie');

const connectDb = require('../db')


const movies = [
    {
      title: 'The Matrix',
      director: 'Hermanas Wachowski',
      year: 1999,
      img: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.jpg',
      genre: 'Acción',
    },
    {
      title: 'The Matrix Reloaded',
      director: 'Hermanas Wachowski',
      year: 2003,
      img: 'https://m.media-amazon.com/images/M/MV5BODE0MzZhZTgtYzkwYi00YmI5LThlZWYtOWRmNWE5ODk0NzMxXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
      genre: 'Acción',
    },
    {
      title: 'Buscando a Nemo',
      director: 'Andrew Stanton',
      year: 2003,
      img: 'https://m.media-amazon.com/images/I/91pyw-RTiYL.jpg',
      genre: 'Animación',
    },
    {
      title: 'Buscando a Dory',
      director: 'Andrew Stanton',
      year: 2016,
      img: 'https://m.media-amazon.com/images/I/91+U+KgLdzL.jpg',
      genre: 'Animación',
    },
    {
      title: 'Interestelar',
      director: 'Christopher Nolan',
      year: 2014,
      img: 'https://m.media-amazon.com/images/I/A1JVqNMI7UL._SL1500_.jpg',
      genre: 'Ciencia ficción',
    },
    {
      title: '50 primeras citas',
      director: 'Peter Segal',
      year: 2004,
      img: 'https://m.media-amazon.com/images/I/71XvMXA5XVL._SL1158_.jpg',
      genre: 'Comedia romántica',
    },
  ];

const moviesDocuments = movies.map((movie) => new Movie(movie));

connectDb().then(async () =>{

    await Movie.collection.drop();
    console.log('Se han eliminado correctamente');

})
.catch((error) => console.log('No se ha podido eliminar', error))
.then(async () => {
    await Movie.insertMany(moviesDocuments);
    console.log('Se han creado correctamente');
})
.catch((error) => console.log('No he podido meter las películas', error))
.finally(() => mongoose.disconnect());