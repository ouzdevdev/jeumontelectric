// askedUserInChargeOf.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Asked = require('./Asked');
const User = require('./User');

const AskedUserInChargeOf = sequelize.define('AskedUserInChargeOf', {  
    asked_uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    user_uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    in_charge_of: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, 
{
    tableName: 'asked_user_in_charge_of',
    timestamps: false,
    schema: 'backend', 
});

AskedUserInChargeOf.belongsTo(Asked, { foreignKey: 'asked_uuid' });
AskedUserInChargeOf.belongsTo(User, { foreignKey: 'user_uuid' });

module.exports = AskedUserInChargeOf;