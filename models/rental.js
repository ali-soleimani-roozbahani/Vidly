const mongoose = require('mongoose');
const Joi = require('joi');

const Rental = mongoose.model('Rental', new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                minlength: 5,
                maxlength: 255,
                required: true
            },
            phone: {
                type: String,
                minlength: 5,
                maxlength: 255,
                required: true
            },
            isGold: {
                type: Boolean,
                default: false
            }
        }),
        required: true
    },

    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                minlength: 5,
                maxlength: 255,
                required: true
            },

            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0
            }
        }),
        required: true
    },

    dataOut: {
        type: Date,
        required: true,
        default: Date.now
    },

    dateReturend: {
        type: Date
    },

    rentalFee: {
        type: Number,
        min: 0
    }

}));


function validateRental(requestBody) {
    const schema = Joi.object({
        customerId: Joi.string().required(),
        movieId: Joi.string().required()
    });

    return schema.validate(requestBody);
}

exports.Rental = Rental
exports.validate = validateRental