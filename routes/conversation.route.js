const express = require('express');
const router = express.Router();
const { conversationController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

/**
* Route : /api/v1/conversations
* Méthode : GET
* Description : Récupérer toutes les conversations
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Liste de toutes les conversations
*/
router.route('/')
    .get(veryJWT, conversationController.getAllConversations)   

/**
* Route : /api/v1/conversations
* Méthode : POST
* Description : Créer une nouvelle conversation
* Authentification requise : Oui
* Permissions requises : N/A
* @body {Object} conversationData - Les données de la conversation à créer
* @returns {Object} - La conversation créée
*/  
    .post(veryJWT, conversationController.createNewConversation); 

/**
* Route : /api/v1/conversations/:id
* Méthode : GET
* Description : Récupérer une conversation par ID
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant de la conversation à récupérer
* @returns {Object} - La conversation spécifiée par ID
*/  
router.route('/:id')
    .get(veryJWT, conversationController.getConversationById)

/**
* Route : /api/v1/conversations/:id
* Méthode : DELETE
* Description : Supprimer une conversation par ID
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant de la conversation à supprimer
* @returns {Object} - Confirmation de la suppression de la conversation
*/  
    .delete(veryJWT, conversationController.deleteConversation); 
    
module.exports = router;
