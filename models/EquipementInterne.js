const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Piece = require('./Piece');

const EquipementInterne = sequelize.define('EquipementInterne', {
  piece_uuid: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  eqp_int_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  eqp_int_label: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  eqp_int_created_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  eqp_int_description: {
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
  tableName: 'equipement_interne',
  timestamps: false,
});

EquipementInterne.belongsTo(Piece, { foreignKey: 'piece_uuid' });
EquipementInterne.belongsTo(Piece, { foreignKey: 'piece_uuid_piece' });

module.exports = EquipementInterne;
