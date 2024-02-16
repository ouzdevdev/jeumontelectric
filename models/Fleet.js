const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Customer = require('./Customer');

// Référencement des flotte des client

const Fleet = sequelize.define('Fleet', {
  fleet_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  fleet_name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fleet_description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  customer_uuid: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  tableName: 'fleet',
  timestamps: false,
});

Fleet.belongsTo(Customer,{ foreignKey: 'customer_uuid'})

module.exports = Fleet;
