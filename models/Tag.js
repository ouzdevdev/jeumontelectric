// tag.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Tag = sequelize.define('Tag', {
  tag_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  tag_label: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tag_created_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'tag',
  timestamps: false,
  schema: 'backend', 
});

module.exports = Tag;
