const { DataTypes } = require('sequelize');
const Asked = require('./Asked');

// Enfant de la table demande , ce ticket sert pour les demande modification technique.

const PRMP = Asked.define('ProcessRequestModificationPurchase', {
  
  prma_ask_purchase_number: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  prma_devis: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  prma_ask_purchase_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  prma_command_purchase_number: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  prma_command_purchase_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  prma_date_of_receipt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  prma_date_estimated_of_receipt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  prma_date_sending: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  prma_date_provision: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  prma_facture: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  prma_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  prma_be: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  prma_price_unit: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  prma_price_total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  prma_pre_attributable: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  prma_ticketing_number: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'process_request_modification_purchase',
  timestamps: false,
});

module.exports = PRMP;
