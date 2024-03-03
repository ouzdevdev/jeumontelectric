// skill.controller.js
const { Skill } = require('../models');

/**
 * @desc Récupère toutes les compétences.
 * @route GET /api/skills
 * @access Private
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Liste des compétences trouvées.
 */
const getAllSkills = async (req, res) => {
    try {
        const skills = await Skill.findAll();

        if (!skills.length) {
            return res.status(404).json({ message: 'No skills found' });
        }

        res.json(skills);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des compétences.' });
    }
};

/**
 * @desc Récupère une compétence par son identifiant.
 * @route GET /api/skills/:id
 * @access Private
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Compétence trouvée.
 */
const getSkillById = async (req, res) => {
    try {
        const { id } = req.params;

        const skill = await Skill.findOne({ where: { skill_id: id } });

        if (!skill) { 
            return res.status(404).json({ message: 'Compétence non trouvée' });
        }

        res.json(skill);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de la compétence.' });
    }
};

/**
 * @desc Crée une nouvelle compétence.
 * @route POST /api/skills
 * @access Private
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Nouvelle compétence créée.
 */
const createNewSkill = async (req, res) => {
    try {
        const { skill_label } = req.body;

        const skill = await Skill.create({ skill_label })
        
        res.json(skill);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la création d\'une compétence.' });
    }
};

/**
 * @desc Supprime une compétence par son identifiant.
 * @route DELETE /api/skills/:id
 * @access Private
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Message indiquant la suppression réussie de la compétence.
 */
const deleteSkill = async (req, res) => {
    try {
        const { id } = req.params;

        await Skill.destroy({
            where: {
                skill_id: id,
            },
        });
        
        res.json({
            message: 'Compétence supprimée avec succès.',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de la compétence.' });
    }
};

module.exports = {
    getAllSkills,
    getSkillById,
    createNewSkill,
    deleteSkill,
};
