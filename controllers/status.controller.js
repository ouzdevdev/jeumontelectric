// status.controller.js
const { Status } = require('../models');

// @desc Get all statuses
// @route GET /api/statuses
// @access Private
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

// @desc Get status by id
// @route GET /api/statuses/:id
// @access Private
const getStatusById = async (req, res) => {
    try {
        const { id } = req.params;

        const status = await Status.findOne({ where: { status_id: id } });

        if (!status) { // Use strict comparison to check for null
            return res.status(404).json({ message: 'Statut non trouvé' });
        }
        res.json(status);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du statut.' });
    }
};

// @desc Create new status
// @route POST /api/statuses
// @access Private
const createNewStatus = async (req, res) => {
    try {
        const { status_id, status_label, status_color } = req.body;

        const status = await Status.create({
            status_id,
            status_label,
            status_color,
        });
        res.json(status);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la création d\'un statut.' });
    }
};

// @desc Delete a status
// @route DELETE /api/statuses/:id
// @access Private
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
