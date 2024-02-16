const Sequelize = require('sequelize');
const logger = require('../middlewares/logger')

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: process.env.DATABASE_DIALECT,
    logging: false, // Set logging to false to disable Sequelize logging
  }
);

(async () => {
  try {
    // Test the database connection
    await sequelize.authenticate();

    // Log that the connection to the database is successful
    logger.info('Connection to the database has been established successfully.');

    // Synchronize the models with the database
    await sequelize.sync();

    // Log that the synchronization was successful
    logger.info('Models synchronized with the database.');

    // Start your application here
  } catch (error) {
    // Log any errors that occurred during synchronization
    logger.error('Error synchronizing models:', error);
  }
})();


module.exports = sequelize;
