const config = require('config');
const logger = require('../utils/logger');


module.exports = function () {
    logger.info('JWT_PRIVATE_KEY : ' + config.get("jwtPrivateKey"));

    if (!config.get('jwtPrivateKey')) {
        throw new Error("FATAL ERROR : jwtPrivateKey is not defined.");
    }
}