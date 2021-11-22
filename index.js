const express = require('express');
const app = express();
const logger = require('./utils/logger');

require('./startup/configuration')();
require('./startup/db')();
require('./startup/validation')();
require('./startup/routes')(app);
require('./startup/prod')(app);

// Launch the app
const port = process.env.PORT || 3000;
const server = app.listen(port, () => logger.info(`Listening to the port ${port}...`));

module.exports = server;