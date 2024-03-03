// skill.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Skill = sequelize.define('Skill', {
  skill_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  skill_label: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'skill',
  timestamps: false,
  schema: 'backend', 
});

module.exports = Skill;
