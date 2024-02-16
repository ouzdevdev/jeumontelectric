const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Correspond au catégorie d'un document.

const Categorie = sequelize.define('Categorie', {
  cat_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
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
});

module.exports = Categorie;
