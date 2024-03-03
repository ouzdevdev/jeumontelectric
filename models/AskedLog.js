// askedLog.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const AskedLogType = require('./AskedLogType');
const Asked = require('./Asked');
const User = require('./User');

const AskedLog = sequelize.define('AskedLog', {
  asked_log_uuid: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  asked_log_text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  asked_log_type_id: {
    type: DataTypes.INTEGER,
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
  asked_log_created_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }, 
}, 
{
  tableName: 'asked_log',
  timestamps: false,
  schema: 'backend', 
});

AskedLog.belongsTo(AskedLogType, { foreignKey: 'asked_log_type_id' });
AskedLog.belongsTo(Asked, { foreignKey: 'asked_uuid' });
AskedLog.belongsTo(User, { foreignKey: 'user_uuid' });

module.exports = AskedLog;
    