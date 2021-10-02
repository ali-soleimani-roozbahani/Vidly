const express = require('express');
const app = express();

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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to the port ${port}...`));