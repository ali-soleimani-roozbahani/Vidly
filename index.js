const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: 'course 1' },
    { id: 2, name: 'course 2' },
    { id: 3, name: 'course 3' },
    { id: 4, name: 'course 4' },
    { id: 5, name: 'course 5' }
];

app.get('/', (req, res) => {
    res.send('Hello World!!!!');
});

app.get('/api/courses', (req, res) => {
    if (Object.keys(req.query).length === 0) {
        res.send(courses);
    } else {
        res.send(req.query);
    }
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send("There is no course with the given id");
    }
    res.send(course);
});

/**
 * Creates new user
 */
app.post('/api/courses', (req, res) => {

    // Validate request body via shema
    const { error, value } = validateCourse(req.body);

    // Check error
    if (error) {
        res.send(error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: value.name
    };

    courses.push(course);

    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    // Check existence
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send("There is no course with the given id");
        return;
    }

    // Validate request body via shema
    const { error, value } = validateCourse(req.body);

    // Check error
    if (error) {
        res.send(error.details[0].message);
        return;
    }

    course.name = value.name;
    res.send(course);

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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to the port ${port}...`));