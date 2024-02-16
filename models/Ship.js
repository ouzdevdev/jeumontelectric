const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Fleet = require('./Fleet');

// Référencement des bateaux d'un flotte et d'un client

const Ship = sequelize.define('Ship', {
  ship_uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  ship_name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fleet_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'ship',
  timestamps: false,
});


Ship.belongsTo(Fleet ,{foreignKey: 'fleet_id'})

module.exports = Ship;
