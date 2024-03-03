// user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Role = require('./Role');

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
    },
    user_phone: {
      type: DataTypes.STRING,
    },
    user_whatsapp_uid: {
      type: DataTypes.STRING,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    sending_email_disable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  } , {    
    tableName: 'user',
    timestamps: false,
    schema: 'backend', 
  }
);


function generatePassword() {
  const length = 12;
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numericChars = '0123456789';
  const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

  const allChars = uppercaseChars + lowercaseChars + numericChars + specialChars;

  let password = '';

  password += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
  password += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
  password += numericChars[Math.floor(Math.random() * numericChars.length)];
  password += specialChars[Math.floor(Math.random() * specialChars.length)];

  for (let i = 4; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  return password;
}

const generatePasswordHook = async (user) => {
  if (!user.user_password) {
    const generatedPassword = generatePassword();
    user.user_password = generatedPassword;
  }
};

const validateEmailFormat = (user) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(user.user_email)) {
    throw new Error('Le format de l\'email est invalide.');
  }
};

User.beforeCreate(validateEmailFormat); 
User.beforeCreate(generatePasswordHook); 
User.belongsTo(Role, { foreignKey: 'role_id' });

module.exports = User;