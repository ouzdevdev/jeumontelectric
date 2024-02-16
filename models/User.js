const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcrypt');
const Role = require('./Role');

// Correspond aux utilisateurs qui vont utiliser l'outils

const User = sequelize.define('User', {
    user_uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_numero: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    user_whatsapp_uid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  } , {    
    tableName: 'user',
    timestamps: false,
    
  }
);


// Fonction pour crypter le mot de passe avant la création ou la mise à jour de l'utilisateur
// const hashPasswordHook = async (user) => {
//   if (user.changed('user_password')) {
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(user.user_password, saltRounds);
//     user.user_password = hashedPassword;
//   }
// };

// Hook pour vérifier le format de l'email avant la création de l'utilisateur
const validateEmailFormat = (user) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(user.user_email)) {
    throw new Error('Le format de l\'email est invalide.');
  }
};

// Hooks
// User.beforeCreate(hashPasswordHook);
// User.beforeUpdate(hashPasswordHook);
User.beforeCreate(validateEmailFormat); // Ajout du hook pour la vérification de l'email

User.belongsTo(Role, { foreignKey: 'role_id' });

module.exports = User;