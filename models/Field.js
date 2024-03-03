// field.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const FieldType = require('./FieldType');

const Field = sequelize.define('Field', {
  field_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  field_name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  required: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  field_type_id: {
    type: DataTypes.UUID,
    allowNull: false,
  }
}, {
  tableName: 'field',
  timestamps: false,
  schema: 'backend', 
});

Field.belongsTo(FieldType, { foreignKey: 'field_type_id' });

module.exports = Fault;
