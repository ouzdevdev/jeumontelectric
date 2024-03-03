// prfs.controller.js
const logger = require('../middlewares/logger');
const { PRFS, Ship, Fleet, Customer, Status, Level, EffectType, Side, Skill, AskedLog, User, Attachment, Document } = require('../models');
const { sendRapport, sendEmail } = require('../utils/emailService');
const { sendWhatsAppMessage } = require('../controllers/twilio.controller');
const path = require('path');
const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');
const { getWeek, getYear } = require('date-fns');
const fs = require('fs');
const { handleAskedCreation } = require('../utils/askedHandler');

/**
 * Nom de la fonction : getAllPRFS
 * Description : Récupère toutes les demandes PRFS.
 * @returns {JSON} - Liste des demandes PRFS.
 * @example
 * // Exemple d'utilisation de la fonction
 * getAllPRFS();
 */
const getAllPRFS = async (req, res) => {
    try {
        const prfsList = await PRFS.findAll();

        if (!prfsList.length) {
            return res.status(404).json({ message: 'No PRFS found' });
        }

        res.json(prfsList);
    } catch (error) {
        res.status(500).json({ 
            message: error.message, 
            error: error 
        });
    }
};

/**
 * Nom de la fonction : getPRFSById
 * Description : Récupère une demande PRFS par son ID.
 * @param {string} id - L'ID de la demande PRFS à récupérer.
 * @returns {JSON} - Détails de la demande PRFS.
 * @example
 * // Exemple d'utilisation de la fonction
 * getPRFSById('PRFS_ID');
 */
const getPRFSById = async (req, res) => {
    try {
        const { id } = req.params;
  
        if ( !id ) {
            return res.status(400).json({ message: 'PRFM ID is required' });
        }
      
        const prfsItem = await PRFS.findOne({ 
            where: { asked_uuid: id },
            include: [{
                model: Ship,
                include: [{
                    model: Fleet,
                    include: [{
                        model: Customer
                    }]
                }],
            },{
                model: Status,
            },{
                model: Level,
            },{
                model: EffectType,
            },{
                model: Side,
            },{
                model: Skill,
            },{
                model: User,
            }],
        });
      
        if ( !prfsItem ) {
            return res.status(404).json({ message: 'PRFS not found' });
        }
      
        res.json(prfsItem);
    } catch (error) {
        res.status(500).json({ 
            message: error.message, 
            error: error 
        });
    }
};

/**
 * Nom de la fonction : createPRFS
 * Description : Crée une demande PRFS.
 * @param {Object} requestData - Les données de la demande PRFS.
 * @returns {JSON} - Nouvelle demande PRFS créée.
 * @example
 * // Exemple d'utilisation de la fonction
 * createPRFS({
 *     asked_description: 'Description',
 *     ship_uuid: 'Ship_UUID',
 *     // Autres champs...
 * });
 */
const createPRFS = async (req, res) => {
    try {
        let {
            asked_description,
            ship_uuid,
            prfs_resume,
            prfs_analyse,
            prfs_root_cause,
            prfs_action_taken,
            asked_prfm,
            effect_type_id,
            side_id,
            skill_id,
            level_id,
            urgency,
            user_uuid,
            Incident_report,
        } = req.body;

        if (effect_type_id === 0) {
            effect_type_id = null;
        }

        if (skill_id === 0) {
            skill_id = null;
        }

        if (side_id === 0) {
            side_id = null;
        }

        const newPRFS = await PRFS.create({
            asked_description,
            ship_uuid,
            prfs_resume,
            prfs_analyse,
            prfs_root_cause,
            prfs_action_taken,
            asked_prfm,
            effect_type_id,
            side_id,
            skill_id,
            level_id,
            urgency,
            user_uuid,
            Incident_report
        });

        if (newPRFS.asked_uuid) {

            const { newAskedLog, newConversation } = await handleAskedCreation(newPRFS, user_uuid);

            const emailData = {
                message: `Created ${newPRFS.asked_ref} - ${newPRFS.asked_description}`,
            };
        
            const templatePath = path.join(__dirname, '..', 'public', 'mail', 'mailtoJeumont.html');
    
            sendEmail('cheick.dione-ext@jeumontelectric.com', 'Creation ticket', templatePath, emailData);
            sendWhatsAppMessage(emailData.message);
    
            res.status(201).json({
                prfs: newPRFS,
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
};


/**
 * Nom de la fonction : updatePRFS
 * Description : Met à jour une demande PRFS.
 * @param {string} id - L'ID de la demande PRFS à mettre à jour.
 * @param {string} user_uuid - UUID de l'utilisateur mettant à jour la demande PRFS.
 * @param {Object} updateData - Les données mises à jour de la demande PRFS.
 * @returns {JSON} - Détails de la demande PRFS mise à jour.
 * @example
 * // Exemple d'utilisation de la fonction
 * updatePRFS('PRFS_ID', 'USER_UUID', {
 *     asked_description: 'Nouvelle description',
 *     // Autres champs à mettre à jour...
 * });
 */
const updatePRFS = async (req, res) => {
    try {
        const { id, user_uuid } = req.params;
        
        let updateText = 'Update';
        
        if (!id) {
          return res.status(400).json({ message: 'PRFS ID is required' });
        }

        const {
            asked_ref,
            asked_description,
            ship_uuid,
            prfs_resume,
            prfs_analyse,
            prfs_root_cause,
            prfs_action_taken,
            asked_prfm,
            effect_type_id,
            side_id,
            skill_id,
            level_id,
            status_id,
            validation_customer,
            validation_technician,
            validation_manager,
            Incident_report
        } = req.body;

        console.log(req.body)

        const user = await User.findOne({
            where: { user_uuid }
        });

        const prfsToUpdated = await PRFS.findOne({
            where: { asked_uuid: id }
        });

                
        if ( status_id === '5' || status_id === '6' ) {
            if ( asked_description === '' ) {
                res.status(500).json({ 
                    message: 'To mark it as closed or resolved, you must provide a description.'
                });
            }
            
            if ( prfs_analyse === '' ) {
                res.status(500).json({  
                    message: 'To mark it as closed or resolved, you are required to provide an analysis.'
                });
            } 
            
            if ( prfs_root_cause === '' ) {
                res.status(500).json({  
                    message: 'To close or resolve, it is necessary to document the root cause.'
                });
            } 

            if ( prfs_action_taken === '' ) {
                res.status(500).json({  
                    message: 'To mark it as closed or resolved, you must document the actions taken.'
                });
            }
        }

        if ( validation_customer && validation_technician && validation_manager ) {
            status_id = 6
        }

        await PRFS.update({
            asked_ref,
            asked_description,
            ship_uuid,
            prfs_resume,
            prfs_analyse,
            prfs_root_cause,
            prfs_action_taken,
            asked_prfm,
            effect_type_id,
            side_id,
            skill_id,
            level_id,
            status_id,
            asked_updated_date: new Date(),
            validation_customer,
            validation_technician,
            validation_manager,
            Incident_report
        }, {
            where: { asked_uuid: id } 
        });

        if (prfsToUpdated) {
            if (asked_ref !== prfsToUpdated.asked_ref) {
                updateText += ', asked ref';
            }
            if (asked_description !== prfsToUpdated.asked_description) {
                updateText += ', asked description';
            }
            if (ship_uuid !== prfsToUpdated.ship_uuid) {
                updateText += ', ship UUID';
            }
            if (Incident_report !== prfsToUpdated.Incident_report){
                updateText += ', Incident report';
            }
            if (prfs_resume !== prfsToUpdated.prfs_resume) {
                updateText += ', PRFS resume';
            }
            if (prfs_analyse !== prfsToUpdated.prfs_analyse) {
                updateText += ', PRFS analyse';
            }
            if (prfs_root_cause !== prfsToUpdated.prfs_root_cause) {
                updateText += ', PRFS root cause';
            }
            if (prfs_action_taken !== prfsToUpdated.prfs_action_taken) {
                updateText += ', PRFS action taken';
            }

            if (status_id !== prfsToUpdated.prfs_action_taken) {
                const status = await Status.findOne({
                    where: {
                        status_id,
                    }
                });

                updateText += `, status from ${req.body.Status.status_label} to ${status.status_label}`
            }

            if (skill_id !== prfsToUpdated.skill_id) {
                const skill = await Skill.findOne({
                    where: {
                        skill_id
                    }
                });

                updateText += `, skill from ${req.body.Skill.skill_label} to ${skill.skill_label}`
            }

            if (side_id !== prfsToUpdated.side_id) {
                const side = await Side.findOne({
                    where: {
                        side_id
                    }
                });

                updateText += `, side from ${req.body.Side.side_label} to ${side.side_label}`
            }

            if (effect_type_id !== prfsToUpdated.effect_type_id) {
                const effectType = await EffectType.findOne({
                    where: {
                        effect_type_id,
                    }
                });

                updateText += `, effect type from ${req.body.EffectType.effect_type_label} to ${effectType.effect_type_label}`
            }

            if (level_id !== prfsToUpdated.level_id) {
                const level = await Level.findOne({
                    where: {
                        level_id,
                    }
                })

                updateText += `, level from ${req.body.Level.level_label} to ${level.level_label}`
            }

            if (validation_customer !== prfsToUpdated.validation_customer && validation_customer === true) {
                updateText += ', Validate by customer';
            }            

            if (validation_technician !== prfsToUpdated.validation_technician && validation_technician === true) {
                updateText += ', Validate by technician';
            }

            if (validation_manager !== prfsToUpdated.validation_manager && validation_manager === true) {
                updateText += ', Validate by manager';
            }
        }

        logger.info(updateText);

        const updatedAskedLog = await AskedLog.create({
            asked_log_text: updateText, 
            asked_log_type_id: 2,
            asked_uuid: id,
            user_uuid,
        });

        let emailData = {
            message: `Update : #${prfsToUpdated.asked_ref} by ${user.user_name} ${user.user_first_name}`,
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

        const results = await  sequelize.query(query, { type: Sequelize.QueryTypes.SELECT })
        
        
        if ( status_id === '5' || status_id === '6' ) {
            const status = await Status.findOne({
                where: {
                    status_id,
                }
            });

            emailData = {
                message: `Update : #${prfsToUpdated.asked_ref} by ${user.user_name} ${user.user_first_name}, ticket ${status.status_label}`,
            };
        }

        for (const result of results) {
            if (!result.sending_email_disable) {
                sendEmail(result.user_email, `Asked, Update`, templatePath, emailData);
                sendWhatsAppMessage(emailData.message);
            }
        }

        res.status(201).json({
            message: `Update PRFS with uuid: ${id}`,
            text: updateText,
            updatedAskedLog,
        });
    } catch (error) {
        res.status(500).json({ 
            message: error.message, 
            error: error 
        });
    }
};

/**
* Fonction : cronInfoForTicket
* Description : Cette fonction récupère les informations sur les tickets pour la génération de rapports hebdomadaires.
* Authentification requise : Oui
* Permissions requises : N/A
* @param {Object} req - Requête HTTP
* @param {Object} res - Réponse HTTP
* @returns {Object} - Résultats des requêtes pour la semaine actuelle et la semaine suivante
*/
const cronInfoForTicket = async (req, res) => {
    const currentDate = new Date();
    const currentWeek = getWeek(currentDate);
    const nextWeek = currentWeek + 1;
    const currentYear = getYear(currentDate);

    try {
        const queryLogForLastWeek = `
            SELECT
            *
            FROM backend.asked_log
            INNER JOIN backend.asked_log_type ON backend.asked_log.asked_log_type_id = backend.asked_log_type.asked_log_type_id 
            INNER JOIN backend.asked ON backend.asked_log.asked_uuid = backend.asked.asked_uuid
            INNER JOIN backend.user ON backend.asked_log.user_uuid = backend.user.user_uuid
            WHERE backend.asked_log.asked_log_created_date >= NOW() - INTERVAL '1 weeks'
            ORDER BY backend.asked_log.asked_log_created_date DESC;
        `;
        
        const resultsAskedLogs = await sequelize.query(queryLogForLastWeek, {
            type: Sequelize.QueryTypes.SELECT,
        });

        let text = '';
        let countType1 = 0;
        let countType2 = 0;
        
        resultsAskedLogs.forEach((askedLog) => {
            if (askedLog.asked_log_type_id === 1) {
                countType1++;
            } else if (askedLog.asked_log_type_id === 2 && askedLog.status_id === 1) {
                countType2++;
            }

            const formattedDate = askedLog.asked_log_created_date.toLocaleString('en-GB', {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                timeZone: 'UTC',
            });
            
            const formattedDateWithoutComma = formattedDate.replace(',', '');
            
            text += `- ${askedLog.asked_log_text}, #${askedLog.asked_ref}, ${askedLog.user_name[0]}${askedLog.user_first_name[0]}${askedLog.user_first_name[1]},${formattedDateWithoutComma}. <br />`;
        });
        
        const queryUserCurrentWeek = `
            SELECT
                *
            FROM backend.on_call_support
            INNER JOIN backend.user ON backend.on_call_support.user_uuid = backend.user.user_uuid
            LEFT JOIN backend.user_skill ON backend.on_call_support.user_uuid = backend.user_skill.user_uuid
            WHERE (backend.on_call_support.primary_backup = true OR backend.on_call_support.emergency_backup = true)
            AND backend.on_call_support.week_id = ${currentWeek} AND backend.on_call_support.year_id = ${currentYear};
        `;

        const resultsUserCurrentWeek = await  sequelize.query(queryUserCurrentWeek, { type: Sequelize.QueryTypes.SELECT });

        const queryUserNextWeek = `
            SELECT
                *
            FROM backend.on_call_support
            INNER JOIN backend.user ON backend.on_call_support.user_uuid = backend.user.user_uuid
            LEFT JOIN backend.user_skill ON backend.on_call_support.user_uuid = backend.user_skill.user_uuid
            WHERE (backend.on_call_support.primary_backup = true OR backend.on_call_support.emergency_backup = true)
            AND backend.on_call_support.week_id = ${nextWeek} AND backend.on_call_support.year_id = ${currentYear};
        `;

        const resultsUserNextWeek = await  sequelize.query(queryUserNextWeek, { type: Sequelize.QueryTypes.SELECT });

        const startOfWeek = new Date();
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
        
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); 

        const data = {
            dateDebut: startOfWeek.toLocaleDateString(),
            dateFin: endOfWeek.toLocaleDateString(),
            nbrTicketCreer: countType1,
            nbrTicketUpdate: countType2,
            listeActions: text
        }
        
        const templatePath = path.join(__dirname, '..', 'public', 'mail', 'rapport.html');


        resultsUserCurrentWeek.forEach((user) => {
            sendRapport(
                user.user_email, 
                `Rapport Récapitulatif Hebdomadaire du Support - Semaine ${currentWeek}`, 
                templatePath, 
                data
            );
        });
        
        resultsUserNextWeek.forEach((user) => {
            sendRapport(
                user.user_email,
                `Rapport Récapitulatif Hebdomadaire du Support - Semaine ${currentWeek}`, 
                templatePath, 
                data
            );
        });

        res.json({
            resultsUserCurrentWeek,
            resultsUserNextWeek,
        })
    } catch (error) {
        res.status(500).json({ 
            message: error.message, 
            error: error 
        });
    }
};

/**
* Fonction : uploadFilesAsked
* Description : Cette fonction gère le téléversement de fichiers pour une demande spécifique.
* Authentification requise : Oui
* Permissions requises : N/A
* @param {Object} req - Requête HTTP
* @param {Object} res - Réponse HTTP
* @returns {Object} - Message de confirmation du téléversement et des logs mis à jour
*/
const uploadFilesAsked = async (req, res) => {
    const uploadedFiles = req.files;
    const { user, asked, cat } = req.params;

    for (const file of uploadedFiles) {
        try {
            const fileExtension = path.extname(file.originalname).slice(1);

            const document = await Document.create({
                doc_ref: `Doc#${Date.now()}`,
                doc_description: 'Doc ',
                doc_type: fileExtension,
                doc_size: file.size,
                doc_last_version: file.originalname, 
                doc_localisation_numerique: file.filename,
                doc_url: `files/${file.filename}` ,
                user_uuid: user,
                cat_id: cat
            });

            const attachement = await Attachment.create({
                doc_uuid: document.doc_uuid,
                doc_size: document.doc_size,
                doc_url: document.doc_url,
                asked_uuid: asked,
                user_uuid: user,
                doc_type: document.doc_type,
                doc_description: document.doc_description,
                doc_ref: document.doc_ref,
                doc_last_version: document.doc_last_version,
                doc_localisation_numerique: document.doc_localisation_numerique,
                attachment_label: `Attachement : ${Date.now()} ${file.originalname}`,
                attachment_description: `Attachement : ${file.filename}`,
                cat_id: 1
            });

        } catch (error) {
            res.status(500).json({ 
                message: error.message, 
                error: error 
            });
        }
    }

    const updatedAskedLog = await AskedLog.create({
        asked_log_text: 'Add attachments', 
        asked_log_type_id: 2,
        asked_uuid: asked,
        user_uuid: user,
    });

    res.json({ 
        message :'Files uploaded successfully',
        updatedAskedLog  
    });
}

/**
* Fonction : getAttachementsByAsked
* Description : Cette fonction récupère les pièces jointes associées à une demande spécifique.
* Authentification requise : Oui
* Permissions requises : N/A
* @param {Object} req - Requête HTTP
* @param {Object} res - Réponse HTTP
* @returns {Object} - Liste des pièces jointes pour la demande spécifiée
*/
const getAttachementsByAsked = async (req, res) => {
    try {
        const { asked } = req.params;
    
        const attachements = await Attachment.findAll({
            where: { asked_uuid: asked }
        });
    
        res.json(attachements);
    } catch (error) { 
        res.status(500).json({ 
            message: error.message, 
            error: error 
        });
    }
};

/**
* Fonction : attachementByfilename
* Description : Cette fonction récupère un fichier attaché par son nom de fichier.
* Authentification requise : N/A
* Permissions requises : N/A
* @param {Object} req - Requête HTTP
* @param {Object} res - Réponse HTTP
* @returns {File} - Téléchargement du fichier attaché
*/
const attachementByfilename = (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path.join(__dirname, '..', 'files', filename); 
        
        res.download(filePath, filename);
    } catch (error) {
        res.status(500).json({ 
            message: error.message, 
            error: error 
        });
    }
};

/**
* Fonction : deleteAttachement
* Description : Cette fonction supprime une pièce jointe spécifique.
* Authentification requise : N/A
* Permissions requises : N/A
* @param {Object} req - Requête HTTP
* @param {Object} res - Réponse HTTP
* @returns {Object} - Message de confirmation de suppression ou d'erreur
*/
const deleteAttachement = async (req, res) => {
    try {
        const { attId } = req.params;
        
        const oldAtt = await Attachment.findOne({ where: { attachment_id: attId } });
        
        await Attachment.destroy({ where: { attachment_id: attId } });
    
        const pathSegments = oldAtt.doc_url.split('/');
    
        const fileName = pathSegments[pathSegments.length - 1];
    
        const filePath = path.join(__dirname, '..', 'files', fileName); 
      
        if (fs.existsSync(filePath)) {
            fs.unlink(filePath, (error) => {
                if (error) {
                    res.status(500).json({ 
                        message: error.message, 
                        error: error 
                    });
                } else {
                    res.status(200).json({ 
                        message : 'File deleted successfully'
                    });
                }
            });
        } else {
            res.status(404).json({ 
                message :'File not found'
            });
        }
    } catch (error) {
        res.status(500).json({ 
            message: error.message, 
            error: error 
        });
    }  
};

module.exports = {
    getAllPRFS,
    getPRFSById,
    createPRFS,
    updatePRFS,
    cronInfoForTicket,
    uploadFilesAsked,
    getAttachementsByAsked,
    attachementByfilename,
    deleteAttachement
};

