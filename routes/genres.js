const express = require('express');
const router = express.Router();
const { Genre, validate } = require('../models/genre');


router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) {
        return res.status(404).send("There is no genre with the given id");
    }
    res.send(genre);
});


router.post('/', async (req, res) => {
    // Validate request body via shema
    const { error } = validate(req.body);

    // Check error
    if (error) {
        return res.send(error.details[0].message);
    }

    let genre = new Genre({
        name: req.body.name
    });

    genre = await genre.save();

    res.send(genre);
});

router.put('/:id', async (req, res) => {

    // Validate request body via shema
    const { error } = validate(req.body);

    // Check error
    if (error) {
        return res.send(error.details[0].message);
    }

    // Update this inside of collection
    const genre = await Genre.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, { new: true });

    // Check existence
    if (!genre) {
        return res.status(404).send("There is no genre with the given id");
    }

    res.send(genre);

});

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) {
        return res.status(404).send("The genre with the given ID not found.");
    }

    res.send(genre);
});

module.exports = router;