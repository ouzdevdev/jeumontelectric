// prfm.controller.js
const { PRFM, Ship, Fleet, Customer, Status, Piece, Side, RelatedPrfsOfPrfm, AskedLog, User } = require('../models');
const { sendEmail } = require('../utils/emailService');
const { sendWhatsAppMessage } = require('../controllers/twilio.controller');
const path = require('path');
const { handleAskedCreation } = require('../utils/askedHandler');
const sequelize = require('../config/db');
const { Sequelize } = require('sequelize');

/**
 * Récupère toutes les demandes PRFM.
 * @route GET /api/prfm
 * @access Privé
 * @returns {Array<Object>} - Liste de toutes les demandes PRFM.
 * @throws {Error} - Une erreur si la récupération des demandes PRFM échoue.
 */
const getAllPRFM = async (req, res) => {
  try {
    const prfmList = await PRFM.findAll();

    if (!prfmList.length) {
      return res.status(404).json({ message: 'Aucune demande PRFM trouvée' });
    }

    res.json(prfmList);
  } catch (error) {
    res.status(500).json({ 
      message: error.message, 
      error: error 
    });
  }
};

/**
 * Récupère une demande PRFM par son ID.
 * @route GET /api/prfm/:id
 * @access Privé
 * @param {string} id - L'ID de la demande PRFM.
 * @returns {Object} - La demande PRFM correspondant à l'ID spécifié.
 * @throws {Error} - Une erreur si la récupération de la demande PRFM échoue.
 */
const getPRFMById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ 
        message: 'L\'ID de la PRFM est requis' 
      });
    }
    
    const prfmItem = await PRFM.findOne({ 
      where: { 
        asked_uuid: id 
      },
      include: [{
        model: Ship,
        include: [{
          model: Fleet,
          include: [{ model: Customer }]
        }],
      },{
        model: Status,
      },{
        model: Piece,
      },{
        model: Side,
      },{
        model: User
      }],
    });
    
    if (!prfmItem) {
      return res.status(404).json({ 
        message: 'PRFM non trouvée' 
      });
    }
    
    res.json(prfmItem);
  } catch (error) {
    res.status(500).json({ 
      message: error.message, 
      error: error 
    });
  }
};

/**
 * Crée une nouvelle demande PRFM.
 * @route POST /api/prfm
 * @access Privé
 * @param {Object} req.body - Les informations sur la nouvelle demande PRFM.
 * @returns {Object} - La nouvelle demande PRFM créée.
 * @throws {Error} - Une erreur si la création de la demande PRFM échoue.
 */
const createPRFM = async (req, res) => {
  try {
    const {
      asked_description,
      prfm_resume,
      ship_uuid,
      user_uuid,
      side_id,
      prfm_document,
      prfm_item_piece,
      urgency,
    } = req.body;

    const newPRFM = await PRFM.create({
      asked_description,
      prfm_resume,
      ship_uuid,
      user_uuid,
      side_id,
      prfm_document,
      prfm_item_piece,
      urgency,
    });

    if (newPRFM.asked_uuid) {
      
      const { newAskedLog, newConversation } = await handleAskedCreation(newPRFM, user_uuid);

      const emailData = {
        message: `Création ${newPRFM.asked_ref} - ${newPRFM.asked_description}`,
      };    
          
      const templatePath = path.join(__dirname, '..', 'public', 'mail', 'mailtoJeumont.html');
  
      sendEmail('cheick.dione-ext@jeumontelectric.com', 'Création ticket', templatePath, emailData);
      sendWhatsAppMessage(emailData.message);
  
      res.status(201).json({
        prfm: newPRFM,
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
 * Ajoute une relation entre une demande PRFS et une demande PRFM.
 * @route POST /api/prfm/related
 * @access Privé
 * @param {Object} req.body - Les informations sur la relation entre les demandes PRFS et PRFM.
 * @returns {Object} - La relation créée entre les demandes PRFS et PRFM.
 * @throws {Error} - Une erreur si la création de la relation échoue.
 */
const addPrfsToPrfm = async (req, res) => {
  try {
    const {
      asked_prfs_uuid, 
      asked_prfm_uuid, 
      asked_prfs_ref, 
      asked_prfm_ref
    } = req.body;

    const newRelatedPrfsOfPrfm = await RelatedPrfsOfPrfm.create({
      asked_prfs_uuid, 
      asked_prfm_uuid, 
      asked_prfs_ref, 
      asked_prfm_ref
    });

    res.status(201).json(newRelatedPrfsOfPrfm);
  } catch (error) {
    res.status(500).json({ 
      message: error.message, 
      error: error 
    });
  }
}

/**
 * Récupère les demandes PRFS liées à une demande PRFM.
 * @route GET /api/prfm/related/:id
 * @access Privé
 * @param {string} id - L'ID de la demande PRFM.
 * @returns {Array<Object>} - Liste des demandes PRFS liées à la demande PRFM spécifiée.
 * @throws {Error} - Une erreur si la récupération des demandes PRFS liées échoue.
 */
const getRelatedPrfs = async (req, res) => {
  try {
    const { id } = req.params;

    const relatedPrfsOfPrfm = await RelatedPrfsOfPrfm.findAll({
      where: {
        asked_prfm_uuid: id
      }
    });

    res.status(201).json(relatedPrfsOfPrfm);
  } catch (error) {
    res.status(500).json({ 
      message: error.message, 
      error: error 
    });
  } 
}

/**
 * Supprime une relation entre une demande PRFS et une demande PRFM.
 * @route DELETE /api/prfm/related/:asked_prfs_uuid/:asked_prfm_uuid
 * @access Privé
 * @param {string} asked_prfs_uuid - L'ID de la demande PRFS.
 * @param {string} asked_prfm_uuid - L'ID de la demande PRFM.
 * @returns {Object} - Message de succès indiquant que la relation a été supprimée avec succès.
 * @throws {Error} - Une erreur si la suppression de la relation échoue.
 */
const deleteRelated = async (req, res) => {
  try {
    const { 
      asked_prfs_uuid,
      asked_prfm_uuid 
    } = req.params;

    await RelatedPrfsOfPrfm.destroy({ 
      where: { 
        asked_prfs_uuid,
        asked_prfm_uuid  
      } 
    });

    res.json({ message: 'Relation entre PRFS et PRFM supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ 
      message: error.message, 
      error: error 
    });
  } 
}

/**
 * Met à jour une demande PRFM.
 * @route PUT /api/prfm/:id
 * @access Privé
 * @param {string} id - L'ID de la demande PRFM à mettre à jour.
 * @param {Object} req.body - Les nouvelles informations sur la demande PRFM.
 * @returns {Object} - Message de succès indiquant que la demande PRFM a été mise à jour avec succès.
 * @throws {Error} - Une erreur si la mise à jour de la demande PRFM échoue.
 */
const uploadPRFM = async (req, res) => {
  try {
    const { id, user_uuid } = req.params;
        
    let updateText = 'Mise à jour';
    
    if (!id) {
      return res.status(400).json({ message: 'L\'ID de la PRFM est requis' });
    }

    const {
      asked_ref,
      asked_description,
      prfm_resume,
      ship_uuid,
      side_id,
      prfm_document,
      prfm_item_piece,
      urgency,
    } = req.body;

    const user = await User.findOne({
      where: { user_uuid }
    });

    const prfmToUpdated = await PRFM.findOne({
      where: { asked_uuid: id }
    });

    await PRFM.update({
      asked_ref,
      asked_description,
      prfm_resume,
      ship_uuid,
      side_id,
      prfm_document,
      prfm_item_piece,
      urgency,
      asked_updated_date: new Date(),
    }, {
      where: { asked_uuid: id } 
    });

    if (prfmToUpdated) {
      if (asked_ref !== prfmToUpdated.asked_ref) {
        updateText += ', référence de la demande';
      }
      if (asked_description !== prfmToUpdated.asked_description) {
        updateText += ', description de la demande';
      }
      if (ship_uuid !== prfmToUpdated.ship_uuid) {
        updateText += ', UUID du navire';
      }
      if (prfm_resume !== prfmToUpdated.prfm_resume) {
        updateText += ', résumé PRFM';
      }
    }

    const updatedAskedLog = await AskedLog.create({
      asked_log_text: updateText, 
      asked_log_type_id: 2,
      asked_uuid: id,
      user_uuid,
    });

    const emailData = {
      message: `Mise à jour : #${prfmToUpdated.asked_ref} par ${user.user_name} ${user.user_first_name}`,
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
      message: `Mise à jour de PRFS avec UUID: ${id}`,
      updatedAskedLog,
    });
  } catch (error) {
    res.status(500).json({ 
      message: error.message, 
      error: error 
    });
  } 
}

module.exports = {
  getAllPRFM,
  getPRFMById,
  createPRFM,
  addPrfsToPrfm,
  uploadPRFM,
  getRelatedPrfs,
  deleteRelated
};
