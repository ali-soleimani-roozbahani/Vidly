const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    }
});

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(requestBody) {
    // Define a shema for validating inputs came from client
    const schema = Joi.object({
        name: Joi.string().min(5).max(255).required()
    });

    return schema.validate(requestBody);
}

exports.Genre = Genre;
exports.genreSchema = genreSchema;
exports.validate = validateGenre;