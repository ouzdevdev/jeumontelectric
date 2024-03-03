// supportType.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const SupportType = sequelize.define('SupportType', {
    support_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
    },
    support_type_label:{
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
  tableName: 'support_type',
  timestamps: false,
  schema: 'backend', 
});

module.exports = SupportType;
