// index.js
const app = require('./server');
const logger = require('./middlewares/logger');

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    logger.error(`Error occurred while starting the server: ${err.message}`);
  } else {
    logger.info(`Server is running on port ${PORT}`);
  }
});