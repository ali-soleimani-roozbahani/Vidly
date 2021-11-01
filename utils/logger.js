const winston = require('winston');
require('winston-mongodb');

const logger = winston.createLogger({
    format: winston.format.json(),

    transports: [
        new winston.transports.File({
            filename: './logs/pipline.log',
            level: 'error'
        }),

        new winston.transports.MongoDB({
            db: 'mongodb://localhost/vidly',
            level: 'error'
        })
    ],

    exceptionHandlers: [
        new winston.transports.File({
            filename: './logs/exceptions.log'
        })
    ],

    rejectionHandlers: [
        new winston.transports.File({
            filename: './logs/rejections.log'
        })
    ]
});

module.exports = logger;