// Define moudles
const express = require('express');
const mongoose = require('mongoose');
const genresRouter = require('./routes/genres');
const customersRouter = require('./routes/customers');
const app = express();

// Connect to the MongoDB
mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to the MongoDB'))
    .catch(err => console.log('Could not connect to the MongoDB', err))

// Use middlewares
app.use(express.json());

// Use Routers
app.use('/api/genres', genresRouter);
app.use('/api/customers', customersRouter);

// Launch the app
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to the port ${port}...`));