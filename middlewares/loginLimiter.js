// loginLimiter.js
const rateLimit = require('express-rate-limit');
const { logEvents } = require('./logger');

/**
 * Limiteur d'accès à l'API de connexion.
 */
const loginLimiter = rateLimit({
    windowMs: 60 * 1000, // 60 secondes
    max: 5, // Maximum 5 requêtes par fenêtre de 60 secondes
    message: { 
        message: 'Trop de tentatives de connexion depuis cette adresse IP, veuillez réessayer après une pause de 60 secondes' 
    },
    handler: (req, res, next, options) => {
        logEvents(`Trop de requêtes: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log');
        res.status(options.statusCode).send(options.message);
    },
    standardHeaders: true, 
    legacyHeaders: false,
});

module.exports = loginLimiter;
