// year.controller.js
const { Year } = require('../models');

/**
 * Récupère tous les années.
 * @route GET /api/years
 * @access Privé
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Liste des années trouvées.
 */
const getAllYears = async (req, res) => {
    try {
        const years = await Year.findAll();

        if (!years.length) {
            return res.status(404).json({ message: 'No Year found' });
        }

        res.json(years);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching years', error: error.message 
        });
    }
}

module.exports = {
    getAllYears
}
