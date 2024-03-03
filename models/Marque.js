// marque.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Asked = require('./Asked');
const Tag = require('./Tag');

const Marque = sequelize.define('Marque', {
  tag_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  asked_uuid: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
}, {
  tableName: 'marque',
  timestamps: false,
  schema: 'backend', 
});

Marque.belongsTo(Tag, {foreignKey: 'tag_id'})
Marque.belongsTo(Asked ,{foreignKey: 'asked_uuid'})

module.exports = Marque;
