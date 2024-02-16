const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Asked = require('./Asked');
const Conversation = require('./Conversation');

const Message = sequelize.define('Message', {
  message_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  message_created_date: {
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
  asked_uuid: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  user_uuid: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  tableName: 'message',
  timestamps: false,
});

PartDocument.belongsTo(Conversation, { foreignKey: 'convers_uuid' });
PartDocument.belongsTo(Asked, { foreignKey: 'asked_uuid' });
PartDocument.belongsTo(User, { foreignKey: 'user_uuid' });

module.exports = Message;
