// emailHandler.js
const Inbox = require('inbox');
const logger = require('../middlewares/logger');
const { Conversation, PRFS, Message } = require('../models');

/**
 * Fonction pour traiter un nouvel e-mail reçu et créer un message pour une conversation.
 * @param {Object} client - Client de messagerie IMAP.
 * @param {Object} message - Message reçu.
 */
async function handleNewEmail(client, message) {
    // Obtenir asked_ref et le mettre en majuscules
    const uppercaseTitle = message.title.toUpperCase();
    
    if ( message.bodystructure ) {
        const messageStream = client.createMessageStream(message.UID);
        let emailContent = '';

        messageStream.on('data', (chunk) => {
            emailContent += chunk.toString('utf8');
        });

        messageStream.on('end', async () => {
        const regex = /Content-Type: text\/plain; charset="UTF-8"([^]+?)--/;
        const match = emailContent.match(regex);

            if (match) {
                const content = match[0].trim();
                const startIndex = content.indexOf('UTF-8') + 8;
                const plainTextContent = `${content.slice(startIndex).trim()} , from: ${message.from.address}`;
            
                const asked = await PRFS.findOne({
                    where: { asked_ref: uppercaseTitle },
                });

                if (asked) {
                    const convers = await Conversation.findOne({
                        where: {
                            asked_uuid: asked.dataValues.asked_uuid,
                        },
                    });

                    if ( convers ) {
                        await Message.create({
                            message_text: plainTextContent,
                            convers_uuid: convers.dataValues.convers_uuid,
                            support_type_id: 1,
                            user_uuid: 'a71cad47-4d56-469f-8e64-bc2b6b092320'
                        });
                    } else {
                        logger.info('Cette conversation n\'a pas été trouvée dans la base de données.');
                    }
                } else {
                    logger.info('Cet asked n\'a pas été trouvé dans la base de données.');
                }
            }
        });
    }
}

/**
 * Fonction pour configurer le client de messagerie pour se connecter à Gmail.
 * @returns {Object} - Client de messagerie IMAP.
 */
function setupEmailClient() {
    // Authentification sur Gmail
    const client = Inbox.createConnection(false, 'imap.gmail.com', {
        secureConnection: true,
        auth: {
            user: process.env.MAIL_ACCOUNT,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    client.connect();

    client.on('connect', () => {
        logger.info('Connecté à Gmail.');

        client.openMailbox('INBOX', { readOnly: true }, (error) => {
            if (error) {
                console.error('Erreur lors de l\'ouverture de la boîte de réception :', error);
            }
        });
    });

    return client;
}

// Exportation des fonctions
module.exports = {
    setupEmailClient,
    handleNewEmail
};