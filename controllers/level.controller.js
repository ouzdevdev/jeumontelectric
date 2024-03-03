// level.controller.js
const { Level } = require('../models');

/**
 * Récupérer tous les niveaux triés par ordre croissant d'ID.
 * @route GET /api/levels
 * @access Privé
 * @returns {Object} - Les niveaux récupérés.
 * @throws {Error} - Une erreur si la récupération des niveaux échoue.
 * @example
 * // Exemple d'appel de la fonction
 * getAllLevels(req, res);
 */
const getAllLevels = async (req, res) => {
    try {
        const levels = await Level.findAll({
            order: [['level_id', 'ASC']], // Remplacez "columnName" par le nom du champ sur lequel vous souhaitez trier
        })
        if (!levels.length) {
            return res.status(404).json({ message: 'No Levels found' });
        }
        res.json(levels);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching levels', error: error.message });
    }
}

/**
 * Récupérer un niveau par son ID.
 * @route GET /api/levels/:id
 * @access Privé
 * @param {string} id - L'ID du niveau à récupérer.
 * @returns {Object} - Le niveau trouvé.
 * @throws {Error} - Une erreur si la récupération du niveau échoue.
 * @example
 * // Exemple d'appel de la fonction
 * getLevelById(req, res);
 */
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

/**
 * Créer un nouveau niveau.
 * @route POST /api/levels
 * @access Privé
 * @param {string} level_label - Le libellé du niveau à créer.
 * @param {string} level_desc - La description du niveau à créer.
 * @returns {Object} - Le niveau créé.
 * @throws {Error} - Une erreur si la création du niveau échoue.
 * @example
 * // Exemple d'appel de la fonction
 * createNewLevel(req, res);
 */
const createNewLevel = async (req, res) => {
    try {
        const { level_label, level_desc } = req.body;

        const level = await Level.create({
            level_label, level_desc
        });
        res.status(201).json(level);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while creating level', error: error.message });
    }
}

/**
 * Supprimer un niveau par son ID.
 * @route DELETE /api/levels/:id
 * @access Privé
 * @param {string} id - L'ID du niveau à supprimer.
 * @returns {Object} - Un message confirmant que le niveau a été supprimé avec succès.
 * @throws {Error} - Une erreur si la suppression du niveau échoue.
 * @example
 * // Exemple d'appel de la fonction
 * deleteLevel(req, res);
 */
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
