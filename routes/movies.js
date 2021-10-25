const express = require('express');
const { Genre } = require('../models/genre');
const router = express.Router();
const { Movie, validateCreateMovieRequestBody, validateUpdateMovieRequestBody } = require('../models/movie');


router.get('/', async (req, res) => {
    const movies = await Movie
        .find()
        .select('-__v')
        .sort('title');
    res.send(movies);
});

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
        return res.status(404).send("There is no movie with the given id");
    }
    res.send(movie);
});

router.post('/', async (req, res) => {
    // Validate request body via shema
    const { error } = validateCreateMovieRequestBody(req.body);
    if (error) return res.send(error.details[0].message);

    // Find genre by its ID
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.send('Invalidate genre');

    const movie = new Movie({
        title: req.body.title,

        genre: {
            _id: genre._id,
            name: genre.name
        },

        numberInStock: req.body.numberInStock,

        dailyRentalRate: req.body.dailyRentalRate
    });

    await movie.save();

    res.send(movie);
});

router.put('/:id', async (req, res) => {

    // Validate request body via shema
    const { error } = validateUpdateMovieRequestBody(req.body);
    if (error) return res.send(error.details[0].message);

    // Find genre by its ID
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.send('Invalidate genre');

    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,

        genre: {
            _id: genre._id,
            name: genre.name
        },

        numberInStock: req.body.numberInStock,

        dailyRentalRate: req.body.dailyRentalRate

    }, { new: true });

    // Check existence
    if (!movie) return res.status(404).send("There is no movie with the given id");

    res.send(movie);

});

router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);

    if (!movie) {
        return res.status(404).send("The movie with the given ID not found.");
    }

    res.send(movie);
});

module.exports = router;