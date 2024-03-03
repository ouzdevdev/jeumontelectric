// conversation.controller.js
const { Conversation } = require('../models');

/**
* Nom de la fonction : getAllConversations
* Description : Récupère toutes les conversations.
* @returns {Object} - Un tableau contenant toutes les conversations.
* @throws {Error} - Erreur si la récupération des conversations échoue.
* @example
* // Exemple d'appel de la fonction
* getAllConversations();
*/
const getAllConversations = async (req, res) => {
    try {
        const conversations = await Conversation.findAll();
        if (!conversations.length) {
            return res.status(404).json({ message: 'No conversations found' });
        }
        res.json(conversations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des conversations.' });
    }
};

/**
* Nom de la fonction : getConversationById
* Description : Récupère une conversation par son ID.
* @param {String} id - L'ID de la conversation à récupérer.
* @returns {Object} - La conversation correspondant à l'ID spécifié.
* @throws {Error} - Erreur si la récupération de la conversation échoue.
* @example
* // Exemple d'appel de la fonction
* getConversationById('conversation_id');
*/
const getConversationById = async (req, res) => {
    try {
        const { id } = req.params;

        const conversation = await Conversation.findOne({ where: { asked_uuid: id } });

        if (!conversation) { // Utilise une comparaison stricte pour vérifier si la conversation est nulle
            return res.status(404).json({ message: 'Compétence non trouvée' });
        }

        res.json(conversation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de la conversation.' });
    }
};

/**
* Nom de la fonction : createNewConversation
* Description : Crée une nouvelle conversation.
* @param {String} convers_title - Le titre de la conversation.
* @param {String} asked_uuid - L'UUID de la demande associée à la conversation.
* @returns {Object} - La conversation nouvellement créée.
* @throws {Error} - Erreur si la création de la conversation échoue.
* @example
* // Exemple d'appel de la fonction
* createNewConversation({ convers_title: 'Titre de la conversation', asked_uuid: 'asked_uuid' });
*/
const createNewConversation = async (req, res) => {
    try {
        const { convers_title, asked_uuid } = req.body;

        const conversation = await Conversation.create({ 
            convers_title, 
            asked_uuid
        });
        
        res.json(conversation);
    } catch (error) {
        res.status(500).json({ 
            message: 'Une erreur est survenue lors de la création d\'une conversation.',
            error
        });
    }
};

/**
* Nom de la fonction : deleteConversation
* Description : Supprime une conversation par son ID.
* @param {String} id - L'ID de la conversation à supprimer.
* @returns {Object} - Un message indiquant que la conversation a été supprimée avec succès.
* @throws {Error} - Erreur si la suppression de la conversation échoue.
* @example
* // Exemple d'appel de la fonction
* deleteConversation('conversation_id');
*/
const deleteConversation = async (req, res) => {
    try {
        const { id } = req.params;

        await Conversation.destroy({
            where: {
                convers_uuid: id,
            },
        });
        res.json({
            message: 'Conversation supprimée avec succès.',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de la conversation.' });
    }
};

module.exports = {
    getAllConversations,
    getConversationById,
    createNewConversation,
    deleteConversation,
};
