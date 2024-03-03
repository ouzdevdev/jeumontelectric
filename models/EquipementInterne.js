// equipementInterne.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Piece = require('./Piece');

const EquipementInterne = sequelize.define('EquipementInterne', {
  piece_uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  piece_label: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  piece_ref: {
    type: DataTypes.TEXT,
  },
  piece_ifs: {
    type: DataTypes.TEXT,
  },
  piece_created_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },  
  piece_uuid_piece: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  eqp_int_label: {
    type: DataTypes.TEXT,
  },
  eqp_int_created_date: {
    type: DataTypes.DATE,
  },
  eqp_int_description: {
    type: DataTypes.TEXT,
  },
  eqp_int_id: {
    type: DataTypes.NUMBER,
  },
}, {
  tableName: 'equipement_internal',
  timestamps: false,
  schema: 'backend', 
});

EquipementInterne.belongsTo(Piece, { foreignKey: 'piece_uuid_piece' });

module.exports = EquipementInterne;
