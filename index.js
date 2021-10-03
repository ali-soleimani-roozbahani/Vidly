// Define moudles
const startupDebugger = require('debug')('app:startup'),
    myDebugger = require('debug')('app:another');
const logger = require('./middlewares/logger');
const config = require('config');
const authenticator = require('./middlewares/authenticator');
const express = require('express');
const app = express();
const coursesRouter = require('./routes/courses');
const homeRouter = require('./routes/home');

// Use middlewares
app.use(express.json());
if (app.get('env') === 'development') {
    app.use(logger);
    startupDebugger('"Logger is enabled"');
}
app.use(authenticator);

// Routers
app.use('/', homeRouter);
app.use('/api/courses', coursesRouter);

// Launch the app
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to the port ${port}...`));

myDebugger(config.get('name'));
myDebugger(config.get('mail.host'));
myDebugger(config.get('mail.password'));