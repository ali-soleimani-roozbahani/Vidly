const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/user');


router.post('/', async (req, res) => {
    // Validate request body via shema
    const { error } = validate(req.body);
    if (error) return res.send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registerd');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save()

    res.header('x-auth-token', user.generateToken()).send(_.pick(user, ['_id', 'name', 'email']));

});

module.exports = router;