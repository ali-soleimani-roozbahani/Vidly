const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    phone: {
        type: String,
        required: true
    }
}));

function validateCreateCustomerRequestBody(requestBody) {
    // Define a shema for validating inputs came from client
    const schema = Joi.object({
        isGold: Joi.boolean(),
        name: Joi.string().min(5).max(255).required(),
        phone: Joi.string().required()
    });

    return schema.validate(requestBody);
}

function validateUpdateCustomerRequestBody(requestBody) {
    // Define a shema for validating inputs came from client
    const schema = Joi.object({
        isGold: Joi.boolean(),
        name: Joi.string().min(5).max(255),
        phone: Joi.string()
    });

    return schema.validate(requestBody);
}

exports.Customer = Customer;
exports.validateCreateCustomerRequestBody = validateCreateCustomerRequestBody;
exports.validateUpdateCustomerRequestBody = validateUpdateCustomerRequestBody;