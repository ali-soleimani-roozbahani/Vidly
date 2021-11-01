const mongoose = require('mongoose');
const Fawn = require('fawn');
const logger = require('../utils/logger');
const connectionString = 'mongodb://localhost/vidly';


module.exports = function () {
    mongoose.connect(connectionString)
        .then(() => logger.info('Connected to the MongoDB'));


    // For running db multi transactions (Two Phases Commit)
    Fawn.init(connectionString);
}