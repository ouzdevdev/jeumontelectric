// project.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Project = sequelize.define('Project', {
    project_uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        primaryKey: true,
    },
    project_ref: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    project_label: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    project_created_date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },
    project_description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    tableName: 'project',
    timestamps: false,
    schema: 'backend', 
});

module.exports = Project;
