const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Correspond à la l'intitulé d'un métier ( Automaticien ou Elec)

const Speciality = sequelize.define('Speciality', {
  speciality_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  speciality_label: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  speciality_description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'speciality',
  timestamps: false,
});

module.exports = Speciality;
