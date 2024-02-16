const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Correspond à la difficulté de la demande

// 1, 'Level 1', 'Technicien avec 1 à 2 ans expérience.'
// 3, 'Level 3', 'Expert dans le domaine avec une experience supérieur à 5 ans.'
// 2, 'Level 2', 'Technicien avec 3 à 6 ans expérience'

const Level = sequelize.define('Level', {
        level_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
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
});

module.exports = Level;
