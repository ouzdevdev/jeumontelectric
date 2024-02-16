const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// ------------------------------------------------------------
// -- Table: Planifier :  Correspond à la planification pour les utilisateurs
// ------------------------------------------------------------

const Planifier = sequelize.define('Planifier', {
  user_uuid: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  week: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  year: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  indisponible: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  reason: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  date_start: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  date_end: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'planifier',
  timestamps: false,
});

TimeSpent.belongsTo(User, { foreignKey: 'user_uuid'});

module.exports = Planifier;
