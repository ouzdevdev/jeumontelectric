// conversation.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Asked = require('./Asked');

const Conversation = sequelize.define('Conversation', {
  convers_uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  convers_created_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  convers_updated_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  convers_title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  convers_public: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }, 
  asked_uuid: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'conversation',
  timestamps: false,
  schema: 'backend', 
});

Conversation.belongsTo(Asked, { foreignKey: 'asked_uuid' });

module.exports = Conversation;
