// level.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Level = sequelize.define('Level', {
    level_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
    },
    level_label: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    level_desc: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    tableName: 'level',
    timestamps: false,
    schema: 'backend', 
});

module.exports = Level;
