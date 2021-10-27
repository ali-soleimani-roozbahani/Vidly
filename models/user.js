const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },

    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    },

    roles: {
        type: [String],
        default: []
    }
});

userSchema.methods.generateToken = function () {
    return jwt.sign({ _id: this._id, roles: this.roles }, config.get('jwtPrivateKey'));
}

const User = mongoose.model('User', userSchema);

function validateUser(requestBody) {
    // Define a shema for validating inputs came from client
    const schema = Joi.object({
        name: Joi.string().min(5).max(255).required(),
        email: Joi.string().email().min(5).max(255).required(),
        password: Joi.string().min(6).max(1024).required()
    });

    return schema.validate(requestBody);
}

exports.User = User;
exports.validate = validateUser;