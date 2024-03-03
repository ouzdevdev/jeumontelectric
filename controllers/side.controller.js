// side.controller.js
const { Side } = require('../models');

/**
 * @desc Récupère tous les côtés.
 * @route GET /api/sides
 * @access Private
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Liste des côtés trouvés.
 */
const getAllSides = async (req, res) => {
    try {
        const sides = await Side.findAll({
            where: {
               data_active: true
            },
        });
        if (!sides.length) {
            return res.status(404).json({ message: 'No sides found' });
        }
        res.json(sides);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des utilisateurs.' });
    }
};

/**
 * @desc Récupère un côté par son identifiant.
 * @route GET /api/sides/:id
 * @access Private
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Côté trouvé.
 */
const getSideById = async (req, res) => {
    try {
        const { id } = req.params;

        const side = await Side.findOne({ where: { side_id: id } });

        if (!side) {
            return res.status(404).json({ message: 'Not found' });
        }

        res.json(side);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des utilisateurs.' });
    }
};

/**
 * @desc Crée un nouveau côté.
 * @route POST /api/sides
 * @access Private
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Nouveau côté créé.
 */
const createNewSide = async (req, res) => {
    try {
        const { side_label } = req.body;

        const side = await Side.create({
            side_label,
        });
        res.json(side);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la création d\'un côté.' });
    }
};

/**
 * @desc Supprime un côté par son identifiant.
 * @route DELETE /api/sides/:id
 * @access Private
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Message indiquant la suppression réussie du côté.
 */
const deleteSide = async (req, res) => {
    try {
        const { id } = req.params;

        await Side.destroy({
            where: {
                side_id: id,
            },
        });
        
        res.json({
            message: 'Côté supprimé avec succès.',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du côté.' });
    }
};

module.exports = {
    getAllSides,
    getSideById,
    createNewSide,
    deleteSide,
};
