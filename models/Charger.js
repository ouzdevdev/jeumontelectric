const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Asked = require('./Asked');
const User = require('./User');

// ------------------------------------------------------------
// -- Table: charger :
// -- Une demande peut etre géré par un ou plusieurs user
// -- UN user peu géré une ou plusieurs demande
// ------------------------------------------------------------


const Charger = sequelize.define('Charger', {
  asked_uuid: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  user_uuid: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  in_charge_of: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  tableName: 'charger',
  timestamps: false,
});

// Ajoutez les contraintes de clé étrangère
Charger.belongsTo(Asked, { foreignKey: 'asked_uuid' });
Charger.belongsTo(User, { foreignKey: 'user_uuid' });

module.exports = Charger;
