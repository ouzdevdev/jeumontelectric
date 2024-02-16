// skill.controller.js
const { Skill } = require('../models');

// @desc Get all skills
// @route GET /api/skills
// @access Private
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

// @desc Get skill by id
// @route GET /api/skills/:id
// @access Private
const getSkillById = async (req, res) => {
    try {
        const { id } = req.params;

        const skill = await Skill.findOne({ where: { skill_id: id } });

        if (!skill) { // Use strict comparison to check for null
            return res.status(404).json({ message: 'Compétence non trouvée' });
        }
        res.json(skill);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de la compétence.' });
    }
};

// @desc Create new skill
// @route POST /api/skills
// @access Private
const createNewSkill = async (req, res) => {
    try {
        const { skill_id, skill_label } = req.body;

        const skill = await Skill.create({
            skill_id,
            skill_label,
        });
        res.json(skill);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la création d\'une compétence.' });
    }
};

// @desc Delete a skill
// @route DELETE /api/skills/:id
// @access Private
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
