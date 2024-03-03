// asked.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Status = require('./Status');
const Ship = require('./Ship');
const User = require('./User');

const Asked = sequelize.define('Asked', {
  asked_uuid: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  asked_ref: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  asked_description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  asked_created_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  asked_updated_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_uuid: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  ship_uuid: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  type_asked: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  urgency: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  closing_email: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }, 
}, 
{
  tableName: 'asked',
  timestamps: false,
  schema: 'backend', 
});

Asked.belongsTo(User, { foreignKey: 'user_uuid' });
Asked.belongsTo(Status, { foreignKey: 'status_id' });
Asked.belongsTo(Ship, { foreignKey: 'ship_uuid' });
    
module.exports = Asked;
    