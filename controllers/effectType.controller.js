// effectType.controller.js

const { EffectType } = require('../models');

// Récupérer tous les types d'effets
// GET /api/effectTypes
// Accès : Privé
const getAllEffects = async (req, res) => {
    try {
        const effectTypes = await EffectType.findAll();
        if (!effectTypes.length) {
            return res.status(404).json({ message: 'No effect types found' });
        }
        res.json(effectTypes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching effect types', error: error.message });
    }
}

// Récupérer un type d'effet par son ID
// GET /api/effectTypes/:id
// Accès : Privé
const getEffectById = async (req, res) => {
    try {
        const { id } = req.params;
        const effectType = await EffectType.findOne({ where: { effect_type_id: id } });
        if (!effectType) {
            return res.status(404).json({ message: 'Effect type not found' });
        }
        res.json(effectType);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching effect type', error: error.message });
    }
}

// Créer un nouveau type d'effet
// POST /api/effectTypes
// Accès : Privé
const createNewEffect = async (req, res) => {
    try {   
        const { effect_type_id, effect_type_label, effect_type_description } = req.body;

        const effectType = await EffectType.create({
            effect_type_id, 
            effect_type_label, 
            effect_type_description
        });

        res.status(201).json(effectType);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while creating effect type', error: error.message });
    }
}

// Supprimer un type d'effet par son ID
// DELETE /api/effectTypes/:id
// Accès : Privé
const deleteEffect = async (req, res) => {
    try {
        const { id } = req.params;

        await EffectType.destroy({
            where: {
                effect_type_id: id
            }
        });
        res.json({ message: 'Effect type deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while deleting effect type', error: error.message });
    }
}

module.exports = {
    getAllEffects,
    getEffectById,
    createNewEffect,
    deleteEffect
}
