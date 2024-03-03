// prma.controller.js
const { PRMP, Ship, Fleet, Customer, Status, Piece, User, AskedLog } = require('../models');
const { sendEmail } = require('../utils/emailService');
const path = require('path');
const { handleAskedCreation } = require('../utils/askedHandler');
const sequelize = require('../config/db');
const { Sequelize } = require('sequelize');
const { sendWhatsAppMessage } = require('./twilio.controller');
const logger = require('../middlewares/logger');

/**
 * Récupère toutes les demandes PRMA.
 * @route GET /api/prma
 * @access Privé
 * @returns {Array<Object>} - Liste de toutes les demandes PRMA.
 * @throws {Error} - Une erreur si la récupération des demandes PRMA échoue.
 */
const getAllPRMA = async (req, res) => {
    try {
        const prmaList = await PRMP.findAll();

        if (!prmaList.length) {
            return res.status(404).json({ message: 'Aucune demande PRMA trouvée' });
        }

        res.json(prmaList);
    } catch (error) {
        res.status(500).json({ 
            message: error.message, 
            error: error 
        });
    }
};

/**
 * Récupère une demande PRMA par son ID.
 * @route GET /api/prfs/:id
 * @access Privé
 * @param {string} id - L'ID de la demande PRMA.
 * @returns {Object} - La demande PRMA correspondant à l'ID spécifié.
 * @throws {Error} - Une erreur si la récupération de la demande PRMA échoue.
 */
const getPRMAById = async (req, res) => {
    try {
        const { id } = req.params;
    
        logger.info(id);

        if (!id) {
          return res.status(400).json({ 
            message: 'L\'ID de la PRFM est requis' 
          });
        }
        
        const prmaItem = await PRMP.findOne({ 
            where: { asked_uuid: id },
            include: [
            {
                model: Ship,
                include: [{
                    model: Fleet,
                    include: [{
                        model: Customer
                    }]
                }],
            },
            {
                model: Status,
            },
            {
                model: User,
            }
            ],
        });
        
        if (!prmaItem) {
          return res.status(404).json({ 
            message: 'PRMA non trouvée' 
          });
        }
        
        res.json(prmaItem);
    } catch (error) {
        res.status(500).json({ 
            message: error.message, 
            error: error 
        });
    }
};

/**
 * Crée une nouvelle demande PRMA.
 * @route POST /api/prma
 * @access Privé
 * @param {Object} req.body - Les informations sur la nouvelle demande PRMA.
 * @returns {Object} - La nouvelle demande PRMA créée.
 * @throws {Error} - Une erreur si la création de la demande PRMA échoue.
 */
const createPRMA = async (req, res) => {
    try {
        const {
            asked_description,
            ship_uuid,
            prma_id_crm,
            prma_date,
            prma_project_number,
            prma_purchase_order_po,
            prma_quotation_price_total,
            prma_date_estimated_of_receipt,
            prma_number_da,
            prma_release_date_da,
            user_uuid
        } = req.body;

        const newPRMA = await PRMP.create({
            asked_description,
            ship_uuid,
            prma_id_crm,
            prma_date,
            prma_project_number,
            prma_purchase_order_po,
            prma_quotation_price_total,
            prma_date_estimated_of_receipt,
            prma_number_da,
            prma_release_date_da,
            user_uuid
        });

        if (newPRMA.asked_uuid) {
            const { newAskedLog, newConversation } = await handleAskedCreation(newPRMA, user_uuid);
            
            const emailData = {
                message: `Création ${newPRMA.asked_ref} - ${newPRMA.asked_description}`,
            };
    
            const templatePath = path.join(__dirname, '..', 'public', 'mail', 'mailtoJeumont.html');
    
            sendEmail('cheick.dione-ext@jeumontelectric.com', 'Création ticket', templatePath, emailData);
      
            res.status(201).json({
                prma: newPRMA,
                asked_log: newAskedLog,
                conversation: newConversation
            });
        }

        res.status(204);
    } catch (error) {
        res.status(500).json({ 
            message: error.message, 
            error: error 
        });
    }
}

/**
 * Met à jour une demande PRMA.
 * @route PUT /api/prma/:id/:user_uuid
 * @access Privé
 * @param {string} id - L'ID de la demande PRMA à mettre à jour.
 * @param {string} user_uuid - L'UUID de l'utilisateur effectuant la mise à jour.
 * @param {Object} req.body - Les informations mises à jour sur la demande PRMA.
 * @returns {Object} - Message de succès de la mise à jour de la demande PRMA.
 * @throws {Error} - Une erreur si la mise à jour de la demande PRMA échoue.
 */
const updatePRMA = async (req, res) => {
    try {
        const { id, user_uuid } = req.params;
        
        let updateText = 'Mise à jour';
        
        if (!id) {
          return res.status(400).json({ message: 'L\'ID de la PRMA est requis' });
        }

        const {
            asked_ref,
            asked_description,
            status_id,
            ship_uuid,
            prma_id_crm,
            prma_date,
            prma_project_number,
            prma_purchase_order_po,
            prma_quotation_price_total,
            prma_date_estimated_of_receipt,
            prma_number_da,
            prma_release_date_da,
            offer_received,
            quote_sent_to_supplier,
            quote_received_from_supplier,
            offre_sent,
            customer_response,
            recovery_of_purchase_orders,
            creation_of_the_project,
            creation_of_the_purchase_request,
            release_of_purchase_requisition,
            creating_the_purchase_order,
            material_reception,
            provisionning_jeumont,
            material_sent,
            bill_sent
        } = req.body;

        console.log(req.body);

        const user = await User.findOne({
            where: { user_uuid }
        });
      
        const prmaToUpdated = await PRMP.findOne({
            where: { asked_uuid: id }
        });

        await PRMP.update({            
            asked_ref,
            asked_description,
            status_id,
            ship_uuid,
            prma_id_crm,
            prma_date,
            prma_project_number,
            prma_purchase_order_po,
            prma_quotation_price_total,
            prma_date_estimated_of_receipt,
            prma_number_da,
            prma_release_date_da,
            offer_received,
            quote_sent_to_supplier,
            quote_received_from_supplier,
            offre_sent,
            customer_response,
            recovery_of_purchase_orders,
            creation_of_the_project,
            creation_of_the_purchase_request,
            release_of_purchase_requisition,
            creating_the_purchase_order,
            material_reception,
            provisionning_jeumont,
            material_sent,
            bill_sent,
            asked_updated_date: new Date(),
        }, {
            where: { asked_uuid: id } 
        });

        if (prmaToUpdated) {
            if (asked_ref !== prmaToUpdated.asked_ref) {
                updateText += ', référence de la demande';
              }
            if (asked_description !== prmaToUpdated.asked_description) {
              updateText += ', description de la demande';
            }
            if (ship_uuid !== prmaToUpdated.ship_uuid) {
              updateText += ', UUID du navire';
            }
        }

        const updatedAskedLog = await AskedLog.create({
            asked_log_text: updateText, 
            asked_log_type_id: 2,
            asked_uuid: id,
            user_uuid,
        });

        const emailData = {
            message: `Mise à jour : #${prmaToUpdated.asked_ref} par ${user.user_name} ${user.user_first_name}`,
        };
      
        const templatePath = path.join(__dirname, '..', 'public', 'mail', 'mailtoJeumont.html');
      
        const query = `
            SELECT
              *
            FROM backend.asked_user_in_charge_of
            INNER JOIN backend.user ON backend.asked_user_in_charge_of.user_uuid = backend.user.user_uuid
            LEFT JOIN backend.user_skill ON backend.asked_user_in_charge_of.user_uuid = backend.user_skill.user_uuid
            WHERE backend.asked_user_in_charge_of.in_charge_of = true 
            AND backend.asked_user_in_charge_of.asked_uuid = '${id}' ;
        `;
      
        const results = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT })
          
        for (const result of results) {
            if (!result.sending_email_disable) {
                sendEmail(result.user_email, `Demande, Nouveau message`, templatePath, emailData);
                sendWhatsAppMessage(emailData.message);
            }
        }
      
        res.status(201).json({
            message: `Mise à jour de PRFS avec UUID : ${id}`,
            // updatedAskedLog,
        });
    } catch (error) {
        res.status(500).json({ 
            message: error.message, 
            error: error 
        });
    }
} 

module.exports = {
    getAllPRMA,
    getPRMAById,
    createPRMA,
    updatePRMA
};
