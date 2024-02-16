// effect.controller.js

const { Effect } = require('../models');

// Récupérer tous les effets
// GET /api/effects
// Accès : Privé
const getAllEffects = async (req, res) => {
    try {
        const effects = await Effect.findAll();
        if (!effects.length) {
            return res.status(404).json({ message: 'No effects found' });
        }
        res.json(effects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching effects', error: error.message });
    }
}

// Récupérer un effet par son ID
// GET /api/effects/:id
// Accès : Privé
const getEffectById = async (req, res) => {
    try {
        const { id } = req.params;
        const effect = await Effect.findOne({ where: { effect_id: id } });
        if (!effect) {
            return res.status(404).json({ message: 'Effect not found' });
        }
        res.json(effect);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching effect', error: error.message });
    }
}

// Créer un nouvel effet
// POST /api/effects
// Accès : Privé
const createNewEffect = async (req, res) => {
    try {
        const { effect_id, effect_label, effect_description } = req.body;
        const effect = await Effect.create({
            effect_id, 
            effect_label, 
            effect_description,
        });
        res.status(201).json(effect);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while creating effect', error: error.message });
    }
}

// Supprimer un effet par son ID
// DELETE /api/effects/:id
// Accès : Privé
const deleteEffect = async (req, res) => {
    try {   
        const { id } = req.params;
        await Effect.destroy({
            where: {
                effect_id: id
            }
        });
        res.json({
            message: 'Effect deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while deleting effect', error: error.message });
    }
}

module.exports = {
    getAllEffects,
    getEffectById,
    createNewEffect,
    deleteEffect
}
