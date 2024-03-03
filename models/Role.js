// role.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Role = sequelize.define('Role', {
  role_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  role_label: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  role_description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'role',
  timestamps: false,
  schema: 'backend', 
});

module.exports = Role;
