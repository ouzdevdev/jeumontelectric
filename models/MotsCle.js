// motsCle.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const VersionDoc = require('./VersionDoc');
const Tag = require('./Tag');

const MotsCle = sequelize.define('MotsCle', {
  v_doc_uuid: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  tag_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
}, {
  tableName: 'mots_cle',
  timestamps: false,
  schema: 'backend', 
});

MotsCle.belongsTo(VersionDoc, { foreignKey: 'v_doc_uuid' });
MotsCle.belongsTo(Tag, { foreignKey: 'tag_id' });

module.exports = MotsCle;
