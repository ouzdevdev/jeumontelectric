// side.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Side = sequelize.define('Side', {
  side_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  side_label: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'side',
  timestamps: false,
  schema: 'backend', 
});

module.exports = Side;
