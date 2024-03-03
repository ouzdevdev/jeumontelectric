// effectType.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const EffectType = sequelize.define('EffectType', {
    effect_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, 
    },
    effect_type_label: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    effect_type_description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    effect_type_created_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'effect_type',
    timestamps: false,
    schema: 'backend', 
});

module.exports = EffectType;
