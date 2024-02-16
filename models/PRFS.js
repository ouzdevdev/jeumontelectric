const { DataTypes } = require('sequelize');
const Asked = require('./Asked');
const PRFM = require('./PRFM');
const Side = require('./Side');
const Speciality = require('./Speciality');
const Effect = require('./Effect');
const EffectType = require('./EffectType');

// Enfant de la table de demande , ce ticket sert pour les demande support.

  // prfs_analyse                                TEXT        NOT NULL,
  // prfs_root_cause                             TEXT        NOT NULL,
  // asked_uuid_process_request_for_modification UUID        NULL,
  // effect_type_id                              INTEGER     NOT NULL,
  // effect_id                                   INTEGER     NOT NULL,
  // side_id                                     INTEGER     NOT NULL,
  // speciality_id                               INTEGER     NOT NULL,

  

const PRFS = Asked.define('ProcessRequestForSupport', {
  prfs_analyse: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  prfs_root_cause: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  asked_uuid_process_request_for_modification: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  effect_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  effect_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  side_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  speciality_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'process_request_for_support',
  timestamps: false,
});

PRFS.belongsTo(PRFM, {foreignKey: 'asked_uuid_process_request_for_modification'})
PRFS.belongsTo(EffectType, { foreignKey: 'effect_type_id' });
PRFS.belongsTo(Effect, { foreignKey: 'effect_id' });
PRFS.belongsTo(Side, { foreignKey: 'side_id' });
PRFS.belongsTo(Speciality, { foreignKey: 'speciality_id' });

module.exports = PRFS;
