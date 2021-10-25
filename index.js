// Define moudles
const express = require('express');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const genresRouter = require('./routes/genres');
const customersRouter = require('./routes/customers');
const moviesRouter = require('./routes/movies');
const rentalRouter = require('./routes/rentals');
const app = express();
const connectionString = 'mongodb://localhost/vidly';

// Connect to the MongoDB
mongoose.connect(connectionString)
    .then(() => console.log('Connected to the MongoDB'))
    .catch(err => console.log('Could not connect to the MongoDB', err))

// For running db multi transactions (Two Phases Commit)
Fawn.init(connectionString);

// Use middlewares
app.use(express.json());

// Use Routers
app.use('/api/genres', genresRouter);
app.use('/api/customers', customersRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/rentals', rentalRouter);

// Launch the app
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to the port ${port}...`));