const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Piece = require('./Piece');

const EquipementExterne = sequelize.define('EquipementExterne', {
  piece_uuid: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  eqp_ext_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  eqp_ext_ref: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  eqp_ext_label: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  eqp_ext_ifs: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  piece_label: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  piece_ref: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  piece_ifs: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  piece_created_date: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  piece_uuid_piece: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  tableName: 'equipement_externe',
  timestamps: false,
});

EquipementExterne.belongsTo(Piece, { foreignKey: 'piece_uuid' });
EquipementExterne.belongsTo(Piece, { foreignKey: 'piece_uuid_piece' });

module.exports = EquipementExterne;
