// tag.controller.js
const { Tag } = require('../models');

/**
 * Récupère tous les tags.
 * @route GET /api/tags
 * @access Privé
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Liste des tags trouvés.
 */
const getAllTags = async (req, res) => {
    try {
        const tags = await Tag.findAll({
            where: {
                data_active: true
            },
        });

        if (!tags.length) {
            return res.status(404).json({ message: 'No tag found' });
        }
        res.json(tags);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tags', error: error.message });
    }
}

/**
 * Récupère un tag par son ID.
 * @route GET /api/tags/:id
 * @access Privé
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Tag trouvé.
 */
const getTagById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Tag ID is required' });
        }
        const tag = await Tag.findOne({ where: { tag_id: id } });
        if (!tag) {
            return res.status(404).json({ message: 'Tag not found' });
        }
        res.json(tag);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tag', error: error.message });
    }
}

/**
 * Crée un nouveau tag.
 * @route POST /api/tags
 * @access Privé
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Tag créé.
 */
const createNewTag = async (req, res) => {
    try {
        const { tag_label } = req.body;
    
        const tag = await Tag.create({ tag_label });
    
        res.status(201).json(tag);
    } catch (error) {
        res.status(400).json({ message: 'Invalid tag data received', error: error.message });
    }
}

/**
 * Supprime un tag par son ID.
 * @route DELETE /api/tags/:id
 * @access Privé
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Message de confirmation de suppression du tag.
 */
const deleteTag = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
          return res.status(400).json({ message: 'Tag ID is required' });
        }
        
        await Tag.destroy({ where: { tag_id: id } });
        
        res.json({ 
            message: 'Tag deleted successfully' ,
            tagid: id
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting tag', error: error.message });
    }
}

/**
 * Modifie un tag.
 * @route POST /api/tags/:id
 * @access Privé
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Message de confirmation de modification du tag.
 */
const updateTag = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
          return res.status(400).json({ message: 'Tag ID is required' });
        }

        const { 
            tag_label
        } = req.body;

        Tag.update({ 
            tag_label
        }, {
            where: { tag_id: id } 
        });
    
        res.status(201).json({
            message: 'Tag was updated',
            tagid: id
        });
    } catch (error) {
        res.status(400).json({ message: 'Invalid tag data received', error: error.message });
    }
}

module.exports = {
    createNewTag,
    deleteTag,
    getAllTags,
    getTagById,
    updateTag,
}
