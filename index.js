// Define moudles
const express = require('express');
const mongoose = require('mongoose');
require('express-async-errors');
const errorHandler = require('./middleware/errorHandler');
require('./utils/logger');
const config = require('config');
const Fawn = require('fawn');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const genresRouter = require('./routes/genres');
const customersRouter = require('./routes/customers');
const moviesRouter = require('./routes/movies');
const rentalRouter = require('./routes/rentals');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const app = express();
const connectionString = 'mongodb://localhost/vidly';



// Checking JWT private key
console.log('JWT_PRIVATE_KEY : ' + config.get("jwtPrivateKey"));
if (!config.get('jwtPrivateKey')) {
    console.error("FATAL ERROR : jwtPrivateKey is not defined.");
    process.exit(1); // any number exept zero means failure process result
}

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
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
// Handling errors
app.use(errorHandler);

// Launch the app
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to the port ${port}...`));