const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Correspond aux effet visible sur un bateaux
// 'NONE'
// 'ALARM'
// 'SPEED LIMIT'
// 'TORQUE LIM'
// 'OVERRIDE POSSIBLE'
// 'TORQUE LIM 1/3'
// 'TORQUE LIM 1/2'
// 'TORQUE LIM 2/3'
// 'SPARE'
// 'STOP'
// 'TRIP'
// 'EXCIT. TRIP'
// 'OVERRIDE'

const Effect = sequelize.define('Effect', {
  effect_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  effect_label: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  effect_description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  effect_created_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'effect',
  timestamps: false,
});

module.exports = Effect;
