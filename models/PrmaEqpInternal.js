// prmaEqpInternal.js
const { DataTypes } = require('sequelize');;
const sequelize = require('../config/db');
const Asked = require('./Asked');
const EquipementInterne = require('./EquipementInterne');

const PrmaEqpInternal = sequelize.define('PrmaEqpInternal', {
  asked_uuid : {
    type: DataTypes.UUID,
    allowNull: false,
  },
  piece_uuid : {
    type: DataTypes.UUID,
    allowNull: false,
  },
  prma_eqp_internal_ref: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  quantity: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  purchase_order_number: {
    type: DataTypes.TEXT,
  },
  expected_date: {
    type: DataTypes.DATE,
  },
  status_ifs: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'prma_eqp_internal',
  timestamps: false,
  schema: 'backend', 
});

PrmaEqpInternal.belongsTo(Asked, { foreignKey: 'asked_uuid' });
PrmaEqpInternal.belongsTo(EquipementInterne, { foreignKey: 'piece_uuid' });

module.exports = PrmaEqpInternal;
