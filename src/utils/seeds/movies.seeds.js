const mongoose = require('mongoose');
const Movie = require('../../api/models/Movie');

const connectDb = require('../db')


const movies = [
    {
      title: 'The Matrix',
      director: 'Hermanas Wachowski',
      year: 1999,
      genre: 'Acción',
    },
    {
      title: 'The Matrix Reloaded',
      director: 'Hermanas Wachowski',
      year: 2003,
      genre: 'Acción',
    },
    {
      title: 'Buscando a Nemo',
      director: 'Andrew Stanton',
      year: 2003,
      genre: 'Animación',
    },
    {
      title: 'Buscando a Dory',
      director: 'Andrew Stanton',
      year: 2016,
      genre: 'Animación',
    },
    {
      title: 'Interestelar',
      director: 'Christopher Nolan',
      year: 2014,
      genre: 'Ciencia ficción',
    },
    {
      title: '50 primeras citas',
      director: 'Peter Segal',
      year: 2004,
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