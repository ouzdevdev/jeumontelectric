// askedLogType.controller.js
const { AskedLogType } = require('../models');

/**
* Nom de la fonction : getAllAskedLogTypes
* Description : Récupère tous les types de logs demandés.
* @returns {Object} - Un tableau contenant tous les types de logs demandés.
* @throws {Error} - Erreur si la récupération des types de logs demandés échoue.
* @example
* // Exemple d'appel de la fonction
* getAllAskedLogTypes();
*/
const getAllAskedLogTypes = async (req, res) => {
    try {
        const askedLogTypes = await AskedLogType.findAll();

        if (!askedLogTypes.length) {
            return res.status(404).json({ message: 'No asked log type found' });
        }
        res.json(askedLogTypes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching asked types log', error: error.message });
    }
}

/**
* Nom de la fonction : createNewAskedLogType
* Description : Crée un nouveau type de log demandé.
* @param {String} asked_log_type_label - Libellé du type de log demandé.
* @returns {Object} - Le type de log demandé créé.
* @throws {Error} - Erreur si les données du type de tag demandé sont invalides.
* @example
* // Exemple d'appel de la fonction
* createNewAskedLogType('Nouveau type de log');
*/
const createNewAskedLogType = async (req, res) => {
    try {
        const { asked_log_type_label } = req.body;
    
        const askedLogType = await AskedLogType.create({ asked_log_type_label });
    
        res.status(201).json(askedLogType);
    } catch (error) {
        res.status(400).json({ message: 'Invalid asked tag type data received', error: error.message });
    }
}

module.exports = {
    getAllAskedLogTypes,
    createNewAskedLogType
}