const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Document = require('./Document');
const Asked = require('./Asked');
const User = require('./User');
const Categorie = require('./Categorie');

// -- Table: attachement : Enfant de la table document , Correspond au document en pièce joint dans une demande.

const Attachment = sequelize.define('Attachment', {
  doc_uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  attachment_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  attachment_label: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  attachment_description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  attachment_created_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  attachment_updated_date: {
    type: DataTypes.DATE,
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
    allowNull: false,
  },
}, {
  tableName: 'attachement',
  timestamps: false,
});

// Ajoutez les contraintes de clé étrangère
Attachment.belongsTo(Document, { foreignKey: 'doc_uuid' });
Attachment.belongsTo(Asked, { foreignKey: 'asked_uuid' });
Attachment.belongsTo(User, { foreignKey: 'user_uuid' });
Attachment.belongsTo(Categorie, { foreignKey: 'cat_id' });

module.exports = Attachment;
