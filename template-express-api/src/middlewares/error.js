const log = require('./log.js');

module.exports = errorHandler = (err, req, res, next) => {
    log.error(err);
    res.status(500).send('Something broke!');
    next();
};