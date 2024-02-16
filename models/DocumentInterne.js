const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Document = require('./Document');
const User = require('./User');
const Categorie = require('./Categorie');

// Enfant de la table document , il concerne tous les document technique interne.

const DocumentInterne = sequelize.define('DocumentInterne', {
  doc_uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  localisation_espace_reseau: {
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
  user_uuid: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  cat_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'document_interne',
  timestamps: false,
});
  
DocumentInterne.belongsTo(Document, { foreignKey: 'doc_uuid' });
DocumentInterne.belongsTo(User, { foreignKey: 'user_uuid' });
DocumentInterne.belongsTo(Categorie, { foreignKey: 'cat_id' });  

module.exports = DocumentInterne;
  