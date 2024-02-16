const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Correpond au role des utilisateurs qui utiliserons l'outils

const Role = sequelize.define('Role', {
  role_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
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
});

module.exports = Role;
