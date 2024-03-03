// partDocument.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Document = require('./Document');
const Categorie = require('./Categorie');
const User = require('./User');
const Piece = require('./Piece');

const PartDocument = sequelize.define('PartDocument', {
  doc_uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  part_document_id: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  part_document_name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  part_document_description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  specification: {
    type: DataTypes.TEXT,
    allowNull: false,
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
  piece_uuid: {
    type: DataTypes.UUID,
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
  tableName: 'part_document',
  timestamps: false,
  schema: 'backend', 
});

PartDocument.belongsTo(Document, { foreignKey: 'doc_uuid' });
PartDocument.belongsTo(Piece, { foreignKey: 'piece_uuid' });
PartDocument.belongsTo(User, { foreignKey: 'user_uuid' });
PartDocument.belongsTo(Categorie, { foreignKey: 'cat_id' });

module.exports = PartDocument;
