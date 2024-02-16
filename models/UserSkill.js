const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = require('./User')
const Skill = require('./Skill');

//  Table de liaison pour identifier compétence d'un utilisateurs.

const UserSkill = sequelize.define('UserSkill', {
  user_uuid: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  skill_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
}, {
  tableName: 'user_skill',
  timestamps: false,
});

UserSkill.belongsTo(User, { foreignKey: 'user_uuid' });
UserSkill.belongsTo(Skill, { foreignKey: 'skill_id' });

module.exports = UserSkill;
