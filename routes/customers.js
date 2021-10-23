const express = require('express');
const router = express.Router();
const { Customer, validateCreateCustomerRequestBody, validateUpdateCustomerRequestBody } = require('../models/customer');


router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
        return res.status(404).send("There is no customer with the given id");
    }
    res.send(customer);
});

router.post('/', async (req, res) => {
    // Validate request body via shema
    const { error } = validateCreateCustomerRequestBody(req.body);

    // Check error
    if (error) {
        return res.send(error.details[0].message);
    }

    let customer = new Customer({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    });

    customer = await customer.save();

    res.send(customer);
});

router.put('/:id', async (req, res) => {

    // Validate request body via shema
    const { error } = validateUpdateCustomerRequestBody(req.body);

    // Check error
    if (error) {
        return res.send(error.details[0].message);
    }

    // Update this inside of collection
    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    }, { new: true });

    // Check existence
    if (!customer) {
        return res.status(404).send("There is no customer with the given id");
    }

    res.send(customer);

});

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if (!customer) {
        return res.status(404).send("The customer with the given ID not found.");
    }

    res.send(customer);
});

module.exports = router;