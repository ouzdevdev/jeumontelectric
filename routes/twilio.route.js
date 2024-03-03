const express = require('express');
const router = express.Router();
const { twilioController } = require('../controllers');

/**
* Route : /api/v1/twilio/configure-whatsapp-sender
* Méthode : POST
* Description : Configurer l'envoi de messages WhatsApp
* Authentification requise : Non
* Permissions requises : Aucune
* @body {Object} messageData - Les données du message à envoyer
* @returns {Object} - Réponse de la configuration de l'envoi WhatsApp
*/
router.route('/configure-whatsapp-sender')
    .post(twilioController.sendMessage);

/**
* Route : /api/v1/twilio/twiml
* Méthode : POST
* Description : Recevoir un message TwiML
* Authentification requise : Non
* Permissions requises : Aucune
* @body {Object} messageData - Les données du message TwiML reçu
* @returns {Object} - Réponse après réception du message TwiML
*/
router.route('/twiml')
    .post(twilioController.receiveMessage);

module.exports = router;
