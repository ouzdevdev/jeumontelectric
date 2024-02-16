// tag.controller.js
const { Tag } = require('../models');

// Récupérer tous les tags
// GET /api/tags
// Accès : Privé
const getAllTags = async (req, res) => {
    try {
        const tags = await Tag.findAll();

        if (!tags.length) {
            return res.status(404).json({ message: 'No tag found' });
        }
        res.json(tags);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tags', error: error.message });
    }
}

// Récupérer tag par son ID
// GET /api/tags/:id
// Accès : Privé
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

// Créer un nouveau tag
// POST /api/tags
// Accès : Privé
const createNewTag = async (req, res) => {
    try {
        const { 
            tag_id,
            tag_label
        } = req.body;
    
        const tag = await Tag.create({
            tag_id,
            tag_label
        });
    
        res.status(201).json(tag);
    } catch (error) {
        res.status(400).json({ message: 'Invalid tag data received', error: error.message });
    }
}

// Supprimer un tag par son ID
// DELETE /api/tags/:id
// Accès : Privé
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

// Modifier un tag
// POST /api/tags/:id
// Accès : Privé
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
