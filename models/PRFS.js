// prfs.js
const { DataTypes } = require('sequelize');;
const sequelize = require('../config/db');
const Status = require('./Status');
const Ship = require('./Ship');
const PRFM = require('./PRFM');
const Side = require('./Side');
const Skill = require('./Skill');
const EffectType = require('./EffectType');
const Level = require('./Level');
const User = require('./User');

const PRFS = sequelize.define('ProcessRequestForSupport', {
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
  status_id: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  ship_uuid: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  prfs_resume: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  prfs_analyse: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  prfs_root_cause: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  prfs_action_taken: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  asked_prfm: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  effect_type_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  side_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  skill_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  level_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  prfs_date_resolution : {
    type: DataTypes.DATE,
    allowNull: true,
  },
  validation_customer : {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }, 
  validation_technician : {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }, 
  validation_manager : {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  urgency : {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  user_uuid: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  Incident_report : {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'asked_process_request_for_support',
  timestamps: false,
  schema: 'backend', 
});

PRFS.belongsTo(User, { foreignKey: 'user_uuid' });
PRFS.belongsTo(Status, { foreignKey: 'status_id' });
PRFS.belongsTo(Ship, { foreignKey: 'ship_uuid' });
PRFS.belongsTo(PRFM, { foreignKey:'asked_prfm', targetKey: 'asked_uuid' });
PRFS.belongsTo(EffectType, { foreignKey: 'effect_type_id' });
PRFS.belongsTo(Side, { foreignKey: 'side_id' });
PRFS.belongsTo(Skill, { foreignKey: 'skill_id' });
PRFS.belongsTo(Level, { foreignKey: 'level_id' });

module.exports = PRFS; 