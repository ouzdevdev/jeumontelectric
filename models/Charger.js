// charger.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Asked = require('./Asked');
const User = require('./User');

const Charger = sequelize.define('Charger', {
  asked_uuid: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  user_uuid: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  in_charge_of: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  tableName: 'charger',
  timestamps: false,
  schema: 'backend', 
});

Charger.belongsTo(Asked, { foreignKey: 'asked_uuid' });
Charger.belongsTo(User, { foreignKey: 'user_uuid' });

module.exports = Charger;
