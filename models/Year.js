// year.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
  
const Year = sequelize.define('Year', {
  year_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  year_label: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
}, {
  tableName: 'year',
  timestamps: false,
  schema: 'backend', 
});
  
module.exports = Year; 