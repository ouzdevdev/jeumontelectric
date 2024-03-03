// planifier.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Week = require('./Week');
const Year = require('./Year');

const Planifier = sequelize.define('Planifier', {
  user_uuid: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  week_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  year_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  indisponible: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  reason: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  primary_backup: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  emergency_backup: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'on_call_support',
  timestamps: false,
  schema: 'backend', 
});

Planifier.belongsTo(User, { foreignKey: 'user_uuid' });
Planifier.belongsTo(Week, { foreignKey: 'week_id' });
Planifier.belongsTo(Year, { foreignKey: 'year_id' });

module.exports = Planifier;
