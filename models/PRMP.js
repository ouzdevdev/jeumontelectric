// prmp.js
const { DataTypes } = require('sequelize');;
const sequelize = require('../config/db');
const Status = require('./Status');
const Ship = require('./Ship');
const User = require('./User');

const PRMP = sequelize.define('ProcessRequestModificationPurchase', {
  asked_uuid : {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  asked_ref: {
    type: DataTypes.TEXT,
    unique: true,
  },
  asked_description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  asked_created_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  asked_updated_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status_id: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  ship_uuid: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  prma_id_crm: {
    type: DataTypes.TEXT,
  },
  prma_date: {
    type: DataTypes.DATE,
  },
  prma_number_da: {
    type: DataTypes.TEXT,
  },
  prma_release_date_da: {
    type: DataTypes.DATE,
  },
  prma_desired_delivery_date: {
    type: DataTypes.DATE,
  },
  prma_project_number: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  prma_quotation_price_total: {
    type: DataTypes.NUMBER,
  },
  prma_purchase_order_po: {
    type: DataTypes.TEXT,
  },
  user_uuid: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  urgency: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  type_asked: {
    type: DataTypes.TEXT,
  },
  offer_received: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  offer_received_date: {
    type: DataTypes.DATE
  },
  offer_received_attachement: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  quote_received_from_supplier: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }, 
  quote_received_from_supplier_date: {
    type: DataTypes.DATE
  },
  quote_sent_to_supplier: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  quote_sent_to_supplier_date: {
    type: DataTypes.DATE
  },
  offre_sent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  offre_sent_date: {
    type: DataTypes.DATE
  },
  customer_response: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  customer_response_date: {
    type: DataTypes.DATE
  },
  recovery_of_purchase_orders: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  recovery_of_purchase_orders_date: {
    type: DataTypes.DATE
  },
  recovery_of_purchase_orders_attachement: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  creation_of_the_project: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  creation_of_the_project_date: {
    type: DataTypes.DATE
  },
  creation_of_the_project_attachement: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  creation_of_the_purchase_request: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }, 
  creation_of_the_purchase_request_date: {
    type: DataTypes.DATE
  },
  release_of_purchase_requisition: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }, 
  release_of_purchase_requisition_date: {
    type: DataTypes.DATE
  },
  creating_the_purchase_order: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }, 
  creating_the_purchase_order_date: {
    type: DataTypes.DATE
  },
  material_reception: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }, 
  material_reception_date: {
    type: DataTypes.DATE
  },
  provisionning_jeumont: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }, 
  provisionning_jeumont_date: {
    type: DataTypes.DATE
  },
  material_sent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  material_sent_date: {
    type: DataTypes.DATE
  },
  material_sent_attachement: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  bill_sent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  bill_sent_date: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'asked_process_request_modifcation_purchase',
  timestamps: false,
  schema: 'backend', 
});

PRMP.belongsTo(Status, { foreignKey: 'status_id' });
PRMP.belongsTo(Ship, { foreignKey: 'ship_uuid' });
PRMP.belongsTo(User, { foreignKey: 'user_uuid' });

PRMP.beforeUpdate((instance, options) => {
  const updateFields = options.fields;

  if (updateFields) {
    const booleanFields = [
      'offer_received',
      'quote_sent_to_supplier',
      'quote_received_from_supplier',
      'offre_sent',
      'customer_response',
      'recovery_of_purchase_orders',
      'creation_of_the_project',
      'creation_of_the_purchase_request',
      'release_of_purchase_requisition',
      'creating_the_purchase_order',
      'material_reception',
      'provisionning_jeumont',
      'material_sent',
      'bill_sent'
    ];

    booleanFields.forEach(field => {
      if (updateFields[field] === true) {
        const dateField = `${field}_date`;
        instance.setDataValue(dateField, new Date());
      }
    });
  }
});


module.exports = PRMP;
