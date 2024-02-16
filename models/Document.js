const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Categorie = require('./Categorie');

// Correspond à un document ,celui-ci peut etre de divers type , donc héritage.

const Document = sequelize.define('Document', {
  doc_uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  doc_ref: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  doc_description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  doc_type: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  doc_created_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  doc_updated_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  doc_size: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  doc_last_version: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  doc_localisation_numerique: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  doc_url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  user_uuid: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  cat_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'document',
  timestamps: false,
});

Document.belongsTo(User, { foreignKey: 'user_uuid' });
Document.belongsTo(Categorie, { foreignKey: 'cat_id' });

module.exports = Document;
