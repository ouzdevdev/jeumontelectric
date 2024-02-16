const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Asked = require('./Asked');
const Tag = require('./Tag');

// ------------------------------------------------------------
// -- Table: marque
// --Une demande peut avoir un ou plusieurs TAG
// -- Un tag peu etre donnée à une ou plusieurs demande
// ------------------------------------------------------------


const Marque = sequelize.define('Marque', {
  tag_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  asked_uuid: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
}, {
  tableName: 'marque',
  timestamps: false,
});


Marque.belongsTo(Tag, {foreignKey: 'tag_id'})
Marque.belongsTo(Asked ,{foreignKey: 'asked_uuid'})

module.exports = Marque;
