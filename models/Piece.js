const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Piece = sequelize.define('Piece', {
  piece_uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
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
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  piece_uuid_piece: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  tableName: 'piece',
  timestamps: false,
});

EquipementInterne.belongsTo(Piece, { foreignKey: 'piece_uuid' });

module.exports = Piece;
