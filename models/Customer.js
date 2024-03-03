// customer.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Customer = sequelize.define('Customer', {
  customer_uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  customer_ref: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  customer_name: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  customer_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  customer_description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  customer_siret: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  customer_id_customer: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  data_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'customer',
  timestamps: false,
  schema: 'backend', 
});

Customer.belongsTo(Customer, { foreignKey: 'customer_id_customer' });

module.exports = Customer;
