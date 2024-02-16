const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Asked = require('./Asked');
const Effect = require('./Effect')

// -- Table: génerer :
// -- Un fault peut avoir un ou plusieurs effect
// -- Un effect peut être sur un ou plusieurs fault



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
});

// Ajoutez les contraintes de clé étrangère
Generer.belongsTo(Fault, { foreignKey: 'fault_uuid' });
Generer.belongsTo(Effect, { foreignKey: 'effect_id' });

module.exports = Generer;
