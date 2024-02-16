const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Référencement des clients de l'entreprise


// 'c990551d-c725-44c1-a8ef-e22dab7b1098', null, 'PRINCESS CRUISE', '2023-07-17 08:54:49.810937', 'Princess Cruises est une compagnie maritime américaine spécialisée dans les croisières. Elle appartient au groupe Carnival Group, qui détient également d’autres compagnies dont Carnival Cruise Lines, la Cunard, la Holland America Line et Costa', null, null);
// '66bd6d9b-12d3-42d9-951b-b0f445268a58', null, 'CARNIVAL US', '2023-07-17 08:54:49.810937', 'Si vous envisagez de faire une croisière, il y a de fortes chances que vous envisagiez une croisière Carnival. En croissance depuis notre fondation en 1972, Carnival Cruise Line.', null, null);
// '7c68f09d-efd8-4ed8-82d1-e74e68f4f39f', null, 'DISNEY CRUISE', '2023-07-17 08:54:49.810937', 'Disney Cruise Line est une compagnie de croisière, filiale de la Walt Disney Company, née en 1995 quand la Walt Disney Company décida d''arrêter le contrat qu''elle avait avec Premier Cruises pour le segment maritime de ses offres de vacances.', null, null);

const Customer = sequelize.define('Customer', {
  customer_uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  customer_ref: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  customer_name: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  customer_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  customer_description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  customer_siret: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'customer',
  timestamps: false,
});

module.exports = Customer;
