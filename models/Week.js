// week.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
  
const Week = sequelize.define('Week', {
  week_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  week_label: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
}, {
  tableName: 'week',
  timestamps: false,
  schema: 'backend', 
});
  
module.exports = Week; 