const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Determine les type de compétence de l'entreprise.
//'Électrotechnique'
//'Automatisme'

const Skill = sequelize.define('Skill', {
  skill_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  skill_label: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'skill',
  timestamps: false,
});

module.exports = Skill;
