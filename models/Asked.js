const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Status = require('./Status');
const Skill = require('./Skill');
const Ship = require('./Ship');
const Level = require('./Level');

// Table parent d'une demande , c'est une demande générique.

const Asked = sequelize.define('Asked', {
    asked_uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
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
    asked_ref: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ship_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    skill_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    level_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'asked',
    timestamps: false,
  }
);

Asked.belongsTo(Status, { foreignKey: 'status_id' });
Asked.belongsTo(Ship, { foreignKey: 'ship_uuid' });
Asked.belongsTo(Skill, { foreignKey: 'skill_id' });
Asked.belongsTo(Level, { foreignKey: 'level_id' });
    
module.exports = Asked;
    