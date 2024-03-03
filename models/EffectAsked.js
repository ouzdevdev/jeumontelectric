// effectAsked.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Asked = require('./Asked');
const Effect = require('./Effect');

const EffectAsked = sequelize.define('EffectAsked', {
    effect_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    asked_uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
}, 
{
  tableName: 'effect_prfs',
  timestamps: false,
  schema: 'backend', 
});

EffectAsked.belongsTo(Asked, { foreignKey: 'asked_uuid' });
EffectAsked.belongsTo(Effect, { foreignKey: 'effect_id' });
    
module.exports = EffectAsked;
    