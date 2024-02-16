const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Cette table à pour but de définir le coté du bateaux
// 'STBD'
// 'PORT'
// 'STBD / PORT'

const Side = sequelize.define('Side', {
  side_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  side_label: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'side',
  timestamps: false,
});

module.exports = Side;
