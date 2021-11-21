const express = require('express');
const router = express.Router();
const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Genre, validate} = require('../models/genre');


router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id', validateObjectId, async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) {
        return res.status(404).send("There is no genre with the given id");
    }
    res.send(genre);
});


router.post('/', auth, async (req, res) => {
    // Validate request body via shema
    const {error} = validate(req.body);

    // Check error
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const genre = new Genre({
        name: req.body.name
    });

    await genre.save();

    res.send(genre);
});

router.put('/:id', auth, async (req, res) => {

    // Validate request body via shema
    const {error} = validate(req.body);

    // Check error
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Update this inside of collection
    const genre = await Genre.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, {new: true});

    // Check existence
    if (!genre) {
        return res.status(404).send("There is no genre with the given id");
    }

    res.send(genre);

});

router.delete('/:id', [auth, admin], async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) {
        return res.status(404).send("The genre with the given ID not found.");
    }

    res.send(genre);
});

module.exports = router;