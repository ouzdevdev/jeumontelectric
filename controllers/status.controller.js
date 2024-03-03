// status.controller.js
const { Status } = require('../models');

/**
 * @desc Récupère tous les statuts.
 * @route GET /api/statuses
 * @access Private
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Liste des statuts trouvés.
 */
const getAllStatuses = async (req, res) => {
    try {
        const allStatuses = await Status.findAll();

        if (!allStatuses.length) {
            return res.status(404).json({ message: 'No status found' });
        }
        
        res.json(allStatuses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des statuts.' });
    }
};

/**
 * @desc Récupère un statut par son identifiant.
 * @route GET /api/statuses/:id
 * @access Private
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Statut trouvé.
 */
const getStatusById = async (req, res) => {
    try {
        const { id } = req.params;

        const status = await Status.findOne({ where: { status_id: id } });

        if ( !status ) {
            return res.status(404).json({ message: 'Statut non trouvé' });
        }

        res.json(status);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du statut.' });
    }
};

/**
 * @desc Crée un nouveau statut.
 * @route POST /api/statuses
 * @access Private
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Nouveau statut créé.
 */
const createNewStatus = async (req, res) => {
    try {
        const { status_label, status_color } = req.body;

        const status = await Status.create({
            status_label,
            status_color,
        });
        
        res.json(status);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la création d\'un statut.' });
    }
};

/**
 * @desc Supprime un statut par son identifiant.
 * @route DELETE /api/statuses/:id
 * @access Private
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Message indiquant la suppression réussie du statut.
 */
const deleteStatus = async (req, res) => {
    try {
        const { id } = req.params;

        await Status.destroy({
            where: {
                status_id: id,
            },
        });
        res.json({
            message: 'Statut supprimé avec succès.',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du statut.' });
    }
};

module.exports = {
    getAllStatuses,
    getStatusById,
    createNewStatus,
    deleteStatus,
};
