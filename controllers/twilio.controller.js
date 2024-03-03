// twilio.controller.js
const { Conversation, PRFS, Message } = require('../models');
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

/**
 * Fonction pour recevoir un message WhatsApp.
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Réponse HTTP.
 */
const receiveMessage = async (req, res) => {
    try {
        const twiml = new MessagingResponse();
        const messageContent = req.body.Body;
      
        const words = messageContent.trim().split(' ');
        const prfs = words[0].toUpperCase();

        const message = words.slice(1).join(' ');  

        const asked = await PRFS.findOne({ 
            where: { 
                asked_ref: prfs 
            }    
        });

        if ( asked ) {
            const conversation = await Conversation.findOne({
                where: { 
                    asked_uuid: asked.asked_uuid  
                }
            });
            
            if ( conversation ) {
                const messageSave = await Message.create({
                    message_text: message,
                    convers_uuid: conversation.convers_uuid,
                    support_type_id: 4,
                    user_uuid: 'a71cad47-4d56-469f-8e64-bc2b6b092320'
                });
            } 
        }

        res.writeHead(200, { 'Content-Type': 'text/xml' });
        res.end(twiml.toString());
    } catch (error) {
        console.error(`Error recieving whatsApp message: ${error.message}`);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};

/**
 * Fonction pour envoyer un message WhatsApp.
 * @param {string} message - Message à envoyer.
 * @returns {Promise} - Promesse résolue lorsque le message est envoyé.
 */
const sendWhatsAppMessage = async (message) => {
    try {
        await client.messages
            .create({
                body: message,
                from: `whatsapp:${process.env.TWILIO_WHATSAPP_FROM}`,
                to: `whatsapp:${process.env.TWILIO_WHATSAPP_TO}`,
            })
            .then(message => console.log(`Message SID: ${message.sid}`))
            .catch(error => console.error(error.message));
    } catch (error) {
        console.error(`Error sending WhatsApp message: ${error.message}`);
        throw error;
    }
};

/**
 * Fonction pour envoyer un message.
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Réponse HTTP.
 */
const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        await sendWhatsAppMessage(message);

        res.status(200).json({ 
            success: true 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    sendMessage,
    sendWhatsAppMessage,
    receiveMessage
};