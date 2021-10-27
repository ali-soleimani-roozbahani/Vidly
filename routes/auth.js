const config = require('config');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');


router.post('/', async (req, res) => {
    // Validate request body via shema
    const { error } = validate(req);
    if (error) return res.send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');

    res.send(user.generateToken());

});

function validate(req) {
    // Define a shema for validating inputs came from client
    const schema = Joi.object({
        email: Joi.string().email().min(5).max(255).required(),
        password: Joi.string().min(6).max(1024).required()
    });

    return schema.validate(req.body);
}

module.exports = router;