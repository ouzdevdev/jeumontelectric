// prfm.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Status = require('./Status');
const Ship = require('./Ship');
const User = require('./User');
const Side = require('./Side');
const Piece = require('./Piece');

const PRFM = sequelize.define('PRFM', {
  asked_uuid: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  asked_ref: {
    type: DataTypes.TEXT,
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
  prfm_resume: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status_id: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  side_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ship_uuid: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  user_uuid: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  prfm_item_piece: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  prfm_date_resolution: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  prfm_document: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  urgency : {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'asked_process_request_for_modification',
  timestamps: false,
  schema: 'backend', 
});

PRFM.belongsTo(Status, { foreignKey: 'status_id' });
PRFM.belongsTo(Ship, { foreignKey: 'ship_uuid' });
PRFM.belongsTo(User, { foreignKey: 'user_uuid' });
PRFM.belongsTo(Side, { foreignKey: 'side_id' });
PRFM.belongsTo(Piece, { foreignKey: 'prfm_item_piece' });

module.exports = PRFM;