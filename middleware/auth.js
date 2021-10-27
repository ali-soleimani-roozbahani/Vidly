const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = function (req, res, next) {
    const providedToken = req.header('x-auth-token');
    if (!providedToken) return res.status(401).send('Access Denied!');

    try {
        
        const decoded = jwt.verify(providedToken, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();

    } catch (error) {
        console.log(error);
        res.status(400).send('Invalid Token');
    }
}