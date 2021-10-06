const express = require('express');
const Joi = require('joi');
const router = express.Router();


const courses = [
    { id: 1, name: 'course 1' },
    { id: 2, name: 'course 2' },
    { id: 3, name: 'course 3' },
    { id: 4, name: 'course 4' },
    { id: 5, name: 'course 5' }
];

router.get('/', (req, res) => {
    res.send(courses);
});

router.get('/:id', (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send("There is no course with the given id");
    }
    res.send(course);
});


router.post('/', (req, res) => {

    // Validate request body via shema
    const { error, value } = validateCourse(req.body);

    // Check error
    if (error) {
        return res.send(error.details[0].message);
    }

    const course = {
        id: courses.length + 1,
        name: value.name
    };

    courses.push(course);

    res.send(course);
});

router.put('/:id', (req, res) => {
    // Check existence
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send("There is no course with the given id");
    }

    // Validate request body via shema
    const { error, value } = validateCourse(req.body);

    // Check error
    if (error) {
        return res.send(error.details[0].message);
    }

    course.name = value.name;
    res.send(course);

});

router.delete('/:id', (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send("The course with the given ID not found.");
    }

    courses.splice(courses.indexOf(course), 1);

    res.send("Successfully deleted");
});

function validateCourse(requestBody) {
    // Define a shema for validating inputs came from client
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .required()
    });

    return schema.validate(requestBody);
}

module.exports = router;