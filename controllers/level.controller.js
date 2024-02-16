// level.controller.js
const { Level } = require('../models');

// Récupérer tous les niveaux
// GET /api/levels
// Accès : Privé
const getAllLevels = async (req, res) => {
    try {
        const levels = await Level.findAll();
        if (!levels.length) {
            return res.status(404).json({ message: 'No Levels found' });
        }
        res.json(levels);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching levels', error: error.message });
    }
}

// Récupérer un niveau par son ID
// GET /api/levels/:id
// Accès : Privé
const getLevelById = async (req, res) => {
    try {
        const { id } = req.params;
        const level = await Level.findOne({ where: { level_id: id } });
        if (!level) {
            return res.status(404).json({ message: 'Level not found' });
        }
        res.json(level);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching level', error: error.message });
    }
}

// Créer un nouveau niveau
// POST /api/levels
// Accès : Privé
const createNewLevel = async (req, res) => {
    try {
        const { level_id, level_label, level_desc } = req.body;

        const level = await Level.create({
            level_id, level_label, level_desc
        });
        res.status(201).json(level);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while creating level', error: error.message });
    }
}

// Supprimer un niveau par son ID
// DELETE /api/levels/:id
// Accès : Privé
const deleteLevel = async (req, res) => {
    try {
        const { id } = req.params;
        await Level.destroy({
            where: {
                level_id: id
            }
        });
        res.json({ message: 'Level deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while deleting level', error: error.message });
    }
}

module.exports = {
    createNewLevel,
    getAllLevels,
    getLevelById,
    deleteLevel,    
}
