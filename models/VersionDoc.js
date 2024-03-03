// versionDoc.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Document = require('./Document');

const VersionDoc = sequelize.define('VersionDoc', {
  v_doc_uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  v_doc_id: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  v_doc_created_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  v_doc_updated_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  v_doc_size: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  v_doc_localisation: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  doc_uuid: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  tableName: 'version_doc',
  timestamps: false,
  schema: 'backend', 
});

VersionDoc.belongsTo(Document, { foreignKey: 'doc_uuid' });
  
module.exports = VersionDoc;
  