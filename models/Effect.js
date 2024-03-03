// effect.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Effect = sequelize.define('Effect', {
  effect_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  effect_label: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  effect_description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  effect_created_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'effect',
  timestamps: false,
  schema: 'backend', 
});

module.exports = Effect;
