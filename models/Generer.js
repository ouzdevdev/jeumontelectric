// generer.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Effect = require('./Effect')

const Generer = sequelize.define('Generer', {
  fault_uuid: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  effect_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
}, {
  tableName: 'generer',
  timestamps: false,
  schema: 'backend', 
});

Generer.belongsTo(Fault, { foreignKey: 'fault_uuid' });
Generer.belongsTo(Effect, { foreignKey: 'effect_id' });

module.exports = Generer;
