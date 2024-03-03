// message.controller.js
const { Message, User, SupportType, Conversation, Asked } = require('../models');
const path = require('path');
const { sendEmail } = require('../utils/emailService');
const { sendWhatsAppMessage } = require('../controllers/twilio.controller');
const { Op } = require('sequelize');

/**
 * Récupère tous les messages.
 * @route GET /api/messages
 * @access Private
 * @returns {Object} - Les messages récupérés.
 * @throws {Error} - Une erreur si la récupération des messages échoue.
 * @example
 * // Exemple d'appel de la fonction
 * getAllMessages(req, res);
 */
const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.findAll();
        if (!messages.length) {
            return res.status(404).json({ message: 'No messages found' });
        }
        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des messages.' });
    }
};

/**
 * Récupère un message par son ID.
 * @route GET /api/messages/:id
 * @access Private
 * @param {string} id - L'ID du message à récupérer.
 * @returns {Object} - Le message trouvé.
 * @throws {Error} - Une erreur si la récupération du message échoue.
 * @example
 * // Exemple d'appel de la fonction
 * getMessageById(req, res);
 */
const getMessageById = async (req, res) => {
    try {
        const { id } = req.params;

        const message = await Message.findOne({ 
            where: { message_id: id },
            order: [['message_created_date', 'ASC']] 
        });

        if (!message) { 
            return res.status(404).json({ message: 'Message non trouvé' });
        }

        res.json(message);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de la message.' });
    }
};

/**
 * Récupère les messages associés à une conversation.
 * @route GET /api/messages/conversation/:id
 * @access Private
 * @param {string} id - L'ID de la conversation.
 * @returns {Object} - Les messages trouvés.
 * @throws {Error} - Une erreur si la récupération des messages échoue.
 * @example
 * // Exemple d'appel de la fonction
 * getMessagesByConversation(req, res);
 */
const getMessagesByConversation = async (req, res) => {
    try {
        const { id } = req.params;

        const messages = await Message.findAll({ 
            where: { convers_uuid: id } ,
            include: [{
                model: User,
            }],
            order: [['message_created_date', 'ASC']] 
        });

        if (!messages) { 
            return res.status(404).json({ message: 'Message non trouvé' });
        }

        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de la message.', error });
    }
};

/**
 * Crée un nouveau message.
 * @route POST /api/messages
 * @access Private
 * @param {string} message_text - Le texte du message.
 * @param {string} convers_uuid - L'UUID de la conversation.
 * @param {string} support_type_id - L'ID du type de support.
 * @param {string} user_uuid - L'UUID de l'utilisateur.
 * @param {boolean} message_public - La visibilité du message.
 * @returns {Object} - Le message créé.
 * @throws {Error} - Une erreur si la création du message échoue.
 * @example
 * // Exemple d'appel de la fonction
 * createNewMessage(req, res);
 */
const createNewMessage = async (req, res) => {
    try {
        const { 
            message_text, 
            convers_uuid, 
            support_type_id, 
            user_uuid,
            message_public 
        } = req.body;

        const message = await Message.create({ 
            message_text, 
            convers_uuid, 
            support_type_id, 
            user_uuid,
            message_public
        });

        const emailData = {
            message: `Asked : new message ${message_text}`,
        };
    
        const templatePath = path.join(__dirname, '..', 'public', 'mail', 'mailtoJeumont.html');

        sendEmail('cheick.dione-ext@jeumontelectric.com', `Asked, New message`, templatePath, emailData);
        sendWhatsAppMessage(emailData.message);

        res.json(message);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Une erreur est survenue lors de la création d\'une message.', 
            error
        });
    }
};

/**
 * Supprime un message par son ID.
 * @route DELETE /api/messages/:id
 * @access Private
 * @param {string} id - L'ID du message à supprimer.
 * @returns {Object} - Un message confirmant la suppression du message.
 * @throws {Error} - Une erreur si la suppression du message échoue.
 * @example
 * // Exemple d'appel de la fonction
 * deleteMessage(req, res);
 */
const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;

        await Message.destroy({
            where: {
                message_id: id,
            },
        });
        res.json({
            message: 'Message supprimée avec succès.',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de la message.' });
    }
};

/**
 * Récupère les messages associés à un client.
 * @route GET /api/messages/client/:id
 * @access Private
 * @param {string} id - L'ID du client.
 * @returns {Object} - Les messages trouvés.
 * @throws {Error} - Une erreur si la récupération des messages échoue.
 * @example
 * // Exemple d'appel de la fonction
 * getMessagesByClient(req, res);
 */
const getMessagesByClient = async (req, res) => {
    const { id } = req.params;
    const { ship_uuid } = req.query;  

    try {
        const messages = await Message.findAll({ 
            where: { 
                [Op.and]: [
                    {
                        user_uuid: id
                    },
                    ship_uuid ? { '$Conversation.Asked.ship_uuid$': ship_uuid } : {},
                ]
            },
            include: [
                {
                    model: Conversation,
                    include: [
                        {
                            model: Asked
                        }
                    ]
                },
                {
                    model: User,
                },
                {
                    model: SupportType
                }
            ],
            order: [['message_created_date', 'ASC']] 
        });

        if (messages.length === 0) { 
            return res.status(404).json({ message: 'Aucun message trouvé' });
        }

        res.json(messages);
    } catch (error) {
        return res.status(500).json({ 
            message: error.message, 
            error: error 
        });    
    }
};

module.exports = {
    getAllMessages,
    getMessageById,
    createNewMessage,
    deleteMessage,
    getMessagesByClient,
    getMessagesByConversation
};
