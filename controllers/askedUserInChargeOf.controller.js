// askedUserInChargeOf.controller.js
const { Sequelize } = require('sequelize');
const { AskedUserInChargeOf } = require('../models');
const sequelize = require('../config/db');

/**
* Nom de la fonction : getUserByAskedInChargeOf
* Description : Récupère tous les utilisateurs en charge d'une demande spécifique.
* @param {String} asked - L'UUID de la demande spécifique.
* @returns {Object} - Un tableau contenant tous les utilisateurs en charge de la demande spécifiée.
* @throws {Error} - Erreur si la récupération des utilisateurs en charge échoue.
* @example
* // Exemple d'appel de la fonction
* getUserByAskedInChargeOf('asked_uuid');
*/
const getUserByAskedInChargeOf = async (req, res) => {
    try {
        const { asked } = req.params;
        
        const query = `
            SELECT
                *
            FROM backend.asked_user_in_charge_of
            INNER JOIN backend.user ON backend.asked_user_in_charge_of.user_uuid = backend.user.user_uuid
            LEFT JOIN backend.user_skill ON backend.asked_user_in_charge_of.user_uuid = backend.user_skill.user_uuid
            WHERE backend.asked_user_in_charge_of.in_charge_of = true 
            AND backend.asked_user_in_charge_of.asked_uuid = '${asked}' ;
        `;
        
        const results = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });
        
        res.status(201).json(results);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error creating On-Call', 
            error: error
        });
    }
}

/**
* Nom de la fonction : createAskUsr
* Description : Crée une nouvelle association entre un utilisateur et une demande.
* @param {String} asked_uuid - L'UUID de la demande.
* @param {String} user_uuid - L'UUID de l'utilisateur.
* @returns {Object} - L'objet représentant l'association créée.
* @throws {Error} - Erreur si les données pour créer l'association sont invalides.
* @example
* // Exemple d'appel de la fonction
* createAskUsr({ asked_uuid: 'asked_uuid', user_uuid: 'user_uuid' });
*/
const createAskUsr = async (req, res) => {
    try {
        const { asked_uuid, user_uuid } = req.body;
        
        if (!asked_uuid || !user_uuid) {
            return res.status(400).json({ message: 'Asked or User ID is required' });
        }

        const AskedUser = await AskedUserInChargeOf.create({
            asked_uuid,
            user_uuid
        });
        
        res.json(AskedUser);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error creating On-Call', 
            error: error
        });
    }
}

module.exports = {
    getUserByAskedInChargeOf,
    createAskUsr
}
