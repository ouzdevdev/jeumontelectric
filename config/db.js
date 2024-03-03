// db.js
// importation
const Sequelize = require('sequelize');
const logger = require('../middlewares/logger')

// use sequelize to connect to our database and set logging false
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: process.env.DATABASE_DIALECT,
    logging: false,
  }
);

// sequelize authenticate, verified if message exist.
(async () => {
  try {
    await sequelize.authenticate();
    logger.info('Connection to the database has been established successfully.');

    await sequelize.sync();
  } catch (error) {
    logger.error('Error synchronizing models:', error);
  }
})();

module.exports = sequelize;
