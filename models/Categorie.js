// categorie.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Categorie = sequelize.define('Categorie', {
  cat_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  cat_label: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  cat_description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'categorie',
  timestamps: false,
  schema: 'backend', 
});

module.exports = Categorie;
