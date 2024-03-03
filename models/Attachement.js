// attachement.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Asked = require('./Asked');
const User = require('./User');
const Categorie = require('./Categorie');

const Attachment = sequelize.define('Attachment', {
  doc_uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  attachment_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true, 
  },
  attachment_label: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  attachment_description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  attachment_created_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  attachment_updated_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  doc_ref: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  doc_description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  doc_type: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  doc_created_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  doc_updated_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  doc_size: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  doc_last_version: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  doc_localisation_numerique: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  doc_url: {
    type: DataTypes.TEXT,
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
  cat_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'attachement',
  timestamps: false,
  schema: 'backend', 
});

Attachment.belongsTo(Asked, { foreignKey: 'asked_uuid' });
Attachment.belongsTo(User, { foreignKey: 'user_uuid' });
Attachment.belongsTo(Categorie, { foreignKey: 'cat_id' });

module.exports = Attachment;
