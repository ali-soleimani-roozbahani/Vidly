const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genre');

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },

    genre: genreSchema,

    numberInStock: {
        type: Number,
        required: true,
        min: 0
    },

    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0
    }
}));

function validateCreateMovieRequestBody(requestBody) {
    // Define a shema for validating inputs came from client
    const schema = Joi.object({
        title: Joi.string().min(5).max(255).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    });

    return schema.validate(requestBody);
}

function validateUpdateMovieRequestBody(requestBody) {
    // Define a shema for validating inputs came from client
    const schema = Joi.object({
        title: Joi.string().min(5).max(255),
        genreId: Joi.string(),
        numberInStock: Joi.number().min(0),
        dailyRentalRate: Joi.number().min(0)
    });

    return schema.validate(requestBody);
}

exports.Movie = Movie;
exports.validateCreateMovieRequestBody = validateCreateMovieRequestBody;
exports.validateUpdateMovieRequestBody = validateUpdateMovieRequestBody;