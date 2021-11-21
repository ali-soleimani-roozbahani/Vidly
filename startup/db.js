const mongoose = require('mongoose');
const Fawn = require('fawn');
const logger = require('../utils/logger');
const config = require('config');

module.exports = function () {
    const db = config.get('db');

    mongoose.connect(db)
        .then(() => logger.info(`Connected to ${db}`));

    // For running db multi transactions (Two Phases Commit)
    Fawn.init(db);
}