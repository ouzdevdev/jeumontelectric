// equipementInterne.controller.js
const { EquipementInterne } = require('../models');

/**
 * Récupérer tous les équipements internes.
 * @route GET /api/pieces
 * @access Private
 * @returns {Object} - Les équipements internes récupérés.
 * @throws {Error} - Une erreur si la récupération des équipements internes échoue.
 * @example
 * // Exemple d'appel de la fonction
 * getAllEquipementInternes(req, res);
 */
const getAllEquipementInternes = async (req, res) => {
    try {
        const equipementsInterne = await EquipementInterne.findAll();

        if (!equipementsInterne.length) {
            return res.status(404).json({ message: 'No equipement interne found' });
        }

        res.json(equipementsInterne);
    } catch (error) {
        res.status(500).json({ 
            message: error.message,
            error
        });
    }
};

/**
 * Rechercher un équipement interne par son ID.
 * @route GET /api/pieces/:piece_uuid
 * @access Private
 * @param {string} piece_uuid - L'UUID de l'équipement interne à rechercher.
 * @returns {Object} - L'équipement interne trouvé.
 * @throws {Error} - Une erreur si la recherche de l'équipement interne échoue.
 * @example
 * // Exemple d'appel de la fonction
 * findEquipementInterneById(req, res);
 */
const findEquipementInterneById = async (req, res) => {
    try {
        const { piece_uuid } = req.params;

        const equipementsInterne = await EquipementInterne.findOne({
            where: {
                piece_uuid: piece_uuid
            }
        })

        res.json(equipementsInterne);
    } catch (error) {
        res.status(500).json({ 
            message: error.message,
            error
        });
    }
};

module.exports = {
    getAllEquipementInternes,
    findEquipementInterneById
};
