// function.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const EquipementExterne = require('./EquipementExterne');
const Piece = require('./Piece');

const Functionality = sequelize.define('Functionality', {
  function_uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  function_label: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  function_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  function_description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  function_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  piece_uuid: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  eqp_ext_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'functionality',
  timestamps: false,
  schema: 'backend', 
});

Functionality.belongsTo(EquipementExterne, { foreignKey: 'eqp_ext_id' });
Functionality.belongsTo(Piece, { foreignKey: 'piece_uuid' });

module.exports = Functionality;
