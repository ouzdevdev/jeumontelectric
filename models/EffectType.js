const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Correspond aux répercusion sur un bateau

// 'NON CRITICAL'
// 'CRITICAL'
// 'SHUTDOWN'
// 'SLOWDOWN'
// 'HALF'

const EffectType = sequelize.define('EffectType', {
    effect_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
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
});

module.exports = EffectType;
