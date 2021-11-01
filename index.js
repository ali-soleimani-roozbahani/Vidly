const express = require('express');
const app = express();
const logger = require('./utils/logger');

require('./startup/configuration')();
require('./startup/db')();
require('./startup/validation')();
require('./startup/routes')(app);

// Launch the app
const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`Listening to the port ${port}...`));