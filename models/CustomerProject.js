const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Project = require('./Project');
const Ship = require('./Ship');

// ------------------------------------------------------------
// -- Table: pour :
// --        Un ship peu avoir un ou plusieurs projet
// --        Un projet peu etre liée a un plusieurs ship
// ------------------------------------------------------------


const CustomerProject = sequelize.define('CustomerProject', {
  project_uuid: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  ship_uuid: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
}, {
  tableName: 'customer_project',
  timestamps: false,
});

// Ajoutez les contraintes de clé étrangère
CustomerProject.belongsTo(Project, { foreignKey: 'project_uuid' });
CustomerProject.belongsTo(Ship, { foreignKey: 'ship_uuid' });

module.exports = CustomerProject;
