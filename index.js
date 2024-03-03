// index.js
require('dotenv').config();
const app = require('./server');
const logger = require('./middlewares/logger');
const { setupEmailClient, handleNewEmail } = require('./utils/emailHandler');

const PORT = process.env.PORT;

app.listen(PORT, (err) => {
  if (err) {
    logger.error(`Error occurred while starting the server: ${err.message}`);
  } else {
    logger.info(`Server is running on port ${PORT}`);

    const client = setupEmailClient();

    client.on('new', (message) => {
      handleNewEmail(client, message);
    });

    client.on('error', (error) => { console.error('Error:', error) });

    client.on('close', () => { console.log('Connection closed.') });
  }
});