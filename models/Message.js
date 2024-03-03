// message.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Conversation = require('./Conversation');
const SupportType = require('./SupportType');

const Message = sequelize.define('Message', {
  message_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  message_created_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  message_updated_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  message_text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  convers_uuid: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  support_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,  
  },
  user_uuid: {
    type: DataTypes.UUID,
    allowNull: false,
  }, 
  message_public: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }, 
}, {
  tableName: 'message',
  timestamps: false,
  schema: 'backend', 
});

Message.belongsTo(Conversation, { foreignKey: 'convers_uuid' });
Message.belongsTo(User, { foreignKey: 'user_uuid' });
Message.belongsTo(SupportType, { foreignKey: 'support_type_id' });

module.exports = Message;
