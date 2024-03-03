// timeSpent.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Asked = require('./Asked');

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
  schema: 'backend', 
});

TimeSpent.belongsTo(User, { foreignKey: 'user_uuid'});
TimeSpent.belongsTo(Asked, { foreignKey: 'asked_uuid'});

module.exports = TimeSpent;
