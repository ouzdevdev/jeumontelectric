const winston = require('winston');

// Configure the logger
const logger = winston.createLogger({
  level: 'info', // Set the log level to 'info' or as desired
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    // Add other transports as needed (e.g., file transport)
  ],
});

module.exports = logger;
