// customerProject.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Project = require('./Project');
const Ship = require('./Ship');

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
  schema: 'backend', 
});

CustomerProject.belongsTo(Project, { foreignKey: 'project_uuid' });
CustomerProject.belongsTo(Ship, { foreignKey: 'ship_uuid' });

module.exports = CustomerProject;
