const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Cette table servira à définir les status possible d'une demande
// 'Opened ', '#55FF33'
// 'Investigation ', '#FFA833'
// 'Satuts to be confirmed', '#33FFDA'
// 'Observation ', '#FFFF33'
// 'Closed ', '#FF3333'
// 'Resolved ', '#FF335B'
const Status = sequelize.define('Status', {
  status_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
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
});

module.exports = Status;
