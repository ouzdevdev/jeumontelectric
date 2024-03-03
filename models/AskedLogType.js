// askedLogType.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const AskedLogType = sequelize.define('AskedLogType', {
  asked_log_type_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  asked_log_type_label: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
}, 
{
  tableName: 'asked_log_type',
  timestamps: false,
  schema: 'backend', 
});

module.exports = AskedLogType;
    