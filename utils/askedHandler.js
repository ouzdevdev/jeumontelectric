// askedHandler.js
const { AskedLog, Conversation } = require('../models');

/**
 * Fonction pour créer un journal des demandes et une conversation pour une demande donnée.
 * @param {Object} asked - Objet représentant la demande à traiter.
 * @param {string} user_uuid - Identifiant de l'utilisateur associé à la création de la demande.
 * @returns {Object} - Un objet contenant les nouveaux journaux de demandes et la nouvelle conversation créés.
 */
async function handleAskedCreation(asked, user_uuid) {
    // Création d'un nouveau journal des demandes
    const newAskedLog = await AskedLog.create({
        asked_log_text: 'Création', 
        asked_log_type_id: 1,
        asked_uuid: asked.asked_uuid,
        user_uuid,
    });

    // Création d'une nouvelle conversation pour la demande
    const newConversation = await Conversation.create({
        convers_title: asked.asked_ref, 
        asked_uuid: asked.asked_uuid
    });

    // Retourne un objet contenant les nouveaux journaux de demandes et la nouvelle conversation créés
    return { newAskedLog, newConversation };
}

module.exports = { handleAskedCreation };
