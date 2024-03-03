// status.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Status = sequelize.define('Status', {
  status_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  status_label: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status_color: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'status',
  timestamps: false,
  schema: 'backend', 
});

module.exports = Status;
