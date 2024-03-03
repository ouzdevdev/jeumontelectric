// relatedPrfsOfPrfm.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const PRFS = require('./PRFS');
const PRFM = require('./PRFM');

const RelatedPrfsOfPrfm = sequelize.define('Asked', {
    asked_prfs_uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
    },
    asked_prfm_uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
    },
    asked_prfs_ref: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    asked_prfm_ref: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, 
{
    tableName: 'related_prfs_of_prfm',
    timestamps: false,
    schema: 'backend', 
});

RelatedPrfsOfPrfm.belongsTo(PRFS, { foreignKey: 'asked_prfs_uuid' });
RelatedPrfsOfPrfm.belongsTo(PRFM, { foreignKey: 'asked_prfm_uuid' });
    
module.exports = RelatedPrfsOfPrfm;
    