// week.controller.js
const { Week } = require('../models');

/**
 * Récupère toutes les semaines.
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Liste des semaines trouvées.
 */
const getAllWeeks = async (req, res) => {
    try {
        const weeks = await Week.findAll();

        if (!weeks.length) {
            return res.status(404).json({ message: 'No Week found' });
        }

        res.json(weeks);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching weeks', 
            error: error.message 
        });
    }
}

module.exports = {
    getAllWeeks
}
