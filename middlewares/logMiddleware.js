const logger = require('./logger');

// Middleware to log incoming requests
const logIncomingRequests = (req, res, next) => {
  logger.info(`Received ${req.method} request at ${req.originalUrl}`);
  next();
};

// Middleware to log outgoing responses
const logOutgoingResponses = (req, res, next) => {
  res.on('finish', () => {
    logger.info(`Sent ${res.statusCode} response for ${req.method} request at ${req.originalUrl}`);
  });
  next();
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  logger.error(`Error occurred: ${err.message}`);
  res.status(500).json({ error: 'Internal Server Error' });
};

module.exports = {
  logIncomingRequests,
  logOutgoingResponses,
  errorHandler,
};
