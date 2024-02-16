const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Piece = require('./Piece');
const EquipementExterne = require('./EquipementExterne');
const Functionality = require('./Function');

// Correspond pour généré  les donnée  comme dans "E_MatrixFlt".


const Fault = sequelize.define('Fault', {
  fault_uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  fault_label: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fault_created_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  fault_description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  fault_setting: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fault_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  function_uuid: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  piece_uuid: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  eqp_int_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'fault',
  timestamps: false,
});

// Ajoutez la contrainte de clé étrangère
Fault.belongsTo(Functionality, { foreignKey: 'function_uuid' });
Fault.belongsTo(EquipementExterne, { foreignKey: 'eqp_ext_id' });
Fault.belongsTo(Piece, { foreignKey: 'piece_uuid' });

module.exports = Fault;
