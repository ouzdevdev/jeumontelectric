// documentInterne_ship.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const DocumentInterne = require('./DocumentInterne');
const Ship = require('./Ship');

const DocumentInterneShip = sequelize.define('DocumentInterneShip', {
    doc_uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    ship_uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
}, 
{
    tableName: 'document_interne_ship',
    timestamps: false,
    schema: 'backend', 
});

DocumentInterneShip.belongsTo(DocumentInterne, { foreignKey: 'doc_uuid' });
DocumentInterneShip.belongsTo(Ship, { foreignKey: 'ship_uuid' });
    
module.exports = DocumentInterneShip;
    