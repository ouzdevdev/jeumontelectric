// ship.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Fleet = require('./Fleet');
const User = require('./User');

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
  ship_description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  user_uuid: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  data_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
}, {
  tableName: 'ship',
  timestamps: false,
  schema: 'backend', 
});

Ship.belongsTo(Fleet ,{foreignKey: 'fleet_id'});
Ship.belongsTo(User ,{foreignKey: 'user_uuid'});

module.exports = Ship;
