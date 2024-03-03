// fieldType.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const FieldType = sequelize.define('FieldType', {
  field_type_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  field_type_name: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
}, {
  tableName: 'field_type',
  timestamps: false,
  schema: 'backend', 
});

module.exports = FieldType;
