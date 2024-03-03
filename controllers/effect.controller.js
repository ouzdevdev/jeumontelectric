// effect.controller.js
const { Effect } = require('../models');

/**
 * Récupérer tous les effets.
 * @route GET /api/effects
 * @access Privé
 * @returns {Object} - Les effets récupérés.
 * @throws {Error} - Une erreur si la récupération des effets échoue.
 * @example
 * // Exemple d'appel de la fonction
 * getAllEffects(req, res);
 */
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

/**
 * Récupérer un effet par son ID.
 * @route GET /api/effects/:id
 * @access Privé
 * @param {string} id - L'ID de l'effet à récupérer.
 * @returns {Object} - L'effet récupéré.
 * @throws {Error} - Une erreur si la récupération de l'effet échoue.
 * @example
 * // Exemple d'appel de la fonction
 * getEffectById(req, res);
 */
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

/**
 * Créer un nouvel effet.
 * @route POST /api/effects
 * @access Privé
 * @param {string} effect_label - Libellé de l'effet.
 * @param {string} effect_description - Description de l'effet.
 * @returns {Object} - L'effet créé.
 * @throws {Error} - Une erreur si la création de l'effet échoue.
 * @example
 * // Exemple d'appel de la fonction
 * createNewEffect(req, res);
 */
const createNewEffect = async (req, res) => {
    try {
        const { effect_label, effect_description } = req.body;
        const effect = await Effect.create({
            effect_label, 
            effect_description,
        });
        
        res.status(201).json(effect);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while creating effect', error: error.message });
    }
}

/**
 * Supprimer un effet par son ID.
 * @route DELETE /api/effects/:id
 * @access Privé
 * @param {string} id - L'ID de l'effet à supprimer.
 * @returns {Object} - Message indiquant que l'effet a été supprimé avec succès.
 * @throws {Error} - Une erreur si la suppression de l'effet échoue.
 * @example
 * // Exemple d'appel de la fonction
 * deleteEffect(req, res);
 */
const deleteEffect = async (req, res) => {
    try {   
        const { id } = req.params;
        
        await Effect.destroy({
            where: {
                effect_id: id
            }
        });

        res.json({ message: 'Effect deleted successfully' });
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