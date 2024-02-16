// side.controller.js
const { Side } = require('../models');

// @desc Get all sides
// @route GET /api/sides
// @access Private
const getAllSides = async (req, res) => {
    try {
        const sides = await Side.findAll();
        if (!sides.length) {
            return res.status(404).json({ message: 'No sides found' });
        }
        res.json(sides);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des utilisateurs.' });
    }
};

// @desc Get side by id
// @route GET /api/sides/:id
// @access Private
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

// @desc Create new side
// @route POST /api/sides
// @access Private
const createNewSide = async (req, res) => {
    try {
        const { side_id, side_label } = req.body;

        const side = await Side.create({
            side_id,
            side_label,
        });
        res.json(side);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la création d\'un côté.' });
    }
};

// @desc Delete a side
// @route DELETE /api/sides/:id
// @access Private
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
