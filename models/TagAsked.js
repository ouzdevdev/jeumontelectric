// tagAsked.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Asked = require('./Asked');
const Tag = require('./Tag');

const TagAsked = sequelize.define('TagAsked', {
    tag_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    asked_uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
}, 
{
    tableName: 'tag_asked',
    timestamps: false,
    schema: 'backend', 
});

TagAsked.belongsTo(Tag, { foreignKey: 'tag_id' });
TagAsked.belongsTo(Asked, { foreignKey: 'asked_uuid' });
    
module.exports = TagAsked;
    