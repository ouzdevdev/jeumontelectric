// userSkill.controller.js
const { UserSkill } = require('../models');

// @desc Get all user skills
// @route GET /api/usersk
// @access Private
const getAllUserSkills = async (req, res) => {
    try {
        const userSkills = await UserSkill.findAll();
        if (!userSkills.length) {
            return res.status(404).json({ message: 'No user skill found' });
        }
        res.json(userSkills);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des compétences des utilisateurs.' });
    }
};

// @desc Get user skill by id
// @route GET /api/usersk/:idUser/:idSkill
// @access Private
const getUserSkillById = async (req, res) => {
    try {
        const { idSkill, idUser } = req.params;

        const userSkill = await UserSkill.findOne({
            where: {
                user_uuid: idUser,
                skill_id: idSkill,
            },
        });

        if (!userSkill) { // Use strict comparison to check for null
            return res.status(404).json({ message: 'Compétence utilisateur non trouvée' });
        }
        res.json(userSkill);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de la compétence utilisateur.' });
    }
};

// @desc Create new user skill
// @route POST /api/usersk
// @access Private
const createNewUserSkill = async (req, res) => {
    try {
        const { user_uuid, skill_id } = req.body;

        const userSkill = await UserSkill.create({ user_uuid, skill_id });

        res.json(userSkill);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la création d\'une compétence utilisateur.' });
    }
};

// @desc Delete a user skill
// @route DELETE /api/usersk/:idUser/:idSkill
// @access Private
const deleteUserSkill = async (req, res) => {
    try {
        const { idSkill, idUser } = req.params;

        await UserSkill.destroy({
            where: {
                user_uuid: idUser,
                skill_id: idSkill,
            },
        });
        res.json({
            message: 'Compétence utilisateur supprimée avec succès.',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de la compétence utilisateur.' });
    }
};

module.exports = {
    createNewUserSkill,
    deleteUserSkill,
    getAllUserSkills,
    getUserSkillById,
};
