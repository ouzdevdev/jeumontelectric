const express = require('express');
const router = express.Router();
const { messageController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

/**
* Route : /api/v1/messages
* Méthode : GET
* Description : Récupérer tous les messages
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Liste de tous les messages
*/
router.route('/')
    .get(veryJWT, messageController.getAllMessages)    

/**
* Route : /api/v1/messages
* Méthode : POST
* Description : Créer un nouveau message
* Authentification requise : Oui
* Permissions requises : N/A
* @body {Object} messageData - Les données du message à créer
* @returns {Object} - Le message créé
*/  
    .post(veryJWT, messageController.createNewMessage);
    
/**
* Route : /api/v1/messages/:id
* Méthode : GET
* Description : Récupérer un message par ID
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant du message à récupérer
* @returns {Object} - Le message spécifié par ID
*/
router.route('/:id')
    .get(veryJWT, messageController.getMessageById)    

/**
* Route : /api/v1/messages/:id
* Méthode : DELETE
* Description : Supprimer un message par ID
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant du message à supprimer
* @returns {Object} - Confirmation de la suppression du message
*/
    .delete(veryJWT, messageController.deleteMessage); 

/**
* Route : /api/v1/messages/conversation/:id
* Méthode : GET
* Description : Récupérer tous les messages d'une conversation spécifique
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant de la conversation pour laquelle récupérer les messages
* @returns {Object} - Liste de tous les messages de la conversation spécifiée par ID
*/
router.route('/conversation/:id')
    .get(veryJWT, messageController.getMessagesByConversation);

/**
* Route : /api/v1/messages/client/:id
* Méthode : GET
* Description : Récupérer tous les messages d'un client spécifique
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant du client pour lequel récupérer les messages
* @returns {Object} - Liste de tous les messages du client spécifié par ID
*/
router.route('/client/:id')
    .get(veryJWT, messageController.getMessagesByClient);

module.exports = router;
