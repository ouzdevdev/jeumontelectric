const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Conversation = sequelize.define('Conversation', {
  convers_uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  convers_created_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  convers_updated_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  convers_title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'conversation',
  timestamps: false,
});

module.exports = Conversation;
