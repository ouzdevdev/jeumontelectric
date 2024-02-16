const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Asked = require('./Asked');

// ------------------------------------------------------------
// -- Table: Time spent
// -- Un user peut faire une ou plusieurs intervention sur une demande
// -- Une demande peut avoir un ou plusieurs intervention d'un user
// ------------------------------------------------------------

const TimeSpent = sequelize.define('TimeSpent', {
  user_uuid: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  asked_uuid: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  time_spent: {
    type: DataTypes.TIME,
    allowNull: false,
  },
}, {
  tableName: 'time_spent',
  timestamps: false,
});

// Ajoutez la contrainte de clé étrangère
TimeSpent.belongsTo(User, { foreignKey: 'user_uuid'});
TimeSpent.belongsTo(Asked, { foreignKey: 'asked_uuid'});


module.exports = TimeSpent;
