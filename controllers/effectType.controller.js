// effectType.controller.js
const { EffectType } = require('../models');

/**
 * Récupérer tous les types d'effets.
 * @route GET /api/effectTypes
 * @access Privé
 * @returns {Object} - Les types d'effets récupérés.
 * @throws {Error} - Une erreur si la récupération des types d'effets échoue.
 * @example
 * // Exemple d'appel de la fonction
 * getAllEffects(req, res);
 */
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

/**
 * Récupérer un type d'effet par son ID.
 * @route GET /api/effectTypes/:id
 * @access Privé
 * @param {string} id - L'ID du type d'effet à récupérer.
 * @returns {Object} - Le type d'effet récupéré.
 * @throws {Error} - Une erreur si la récupération du type d'effet échoue.
 * @example
 * // Exemple d'appel de la fonction
 * getEffectById(req, res);
 */
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

/**
 * Créer un nouveau type d'effet.
 * @route POST /api/effectTypes
 * @access Privé
 * @param {string} effect_type_label - Libellé du type d'effet.
 * @param {string} effect_type_description - Description du type d'effet.
 * @returns {Object} - Le type d'effet créé.
 * @throws {Error} - Une erreur si la création du type d'effet échoue.
 * @example
 * // Exemple d'appel de la fonction
 * createNewEffect(req, res);
 */
const createNewEffect = async (req, res) => {
    try {   
        const { effect_type_label, effect_type_description } = req.body;

        const effectType = await EffectType.create({
            effect_type_label, 
            effect_type_description
        });

        res.status(201).json(effectType);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while creating effect type', error: error.message });
    }
}

/**
 * Supprimer un type d'effet par son ID.
 * @route DELETE /api/effectTypes/:id
 * @access Privé
 * @param {string} id - L'ID du type d'effet à supprimer.
 * @returns {Object} - Message indiquant que le type d'effet a été supprimé avec succès.
 * @throws {Error} - Une erreur si la suppression du type d'effet échoue.
 * @example
 * // Exemple d'appel de la fonction
 * deleteEffect(req, res);
 */
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
