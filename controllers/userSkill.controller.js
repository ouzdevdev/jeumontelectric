// userSkill.controller.js
const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');
const { UserSkill } = require('../models');

/**
 * Récupère toutes les compétences des utilisateurs.
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Liste des compétences des utilisateurs trouvées.
 */
const getAllUserSkills = async (req, res) => {
    try {
        
        const query = `
            SELECT 
                u.user_uuid, 
                u.user_email, 
                us.skill_id,
                u.user_name,
                u.user_first_name,
                u.role_id
            FROM backend.user u
            LEFT JOIN backend.user_skill us ON u.user_uuid = us.user_uuid
            WHERE u.user_uuid IS NOT NULL
            AND u.role_id IN (1, 2, 4);        
        `;
    

        const results = await  sequelize.query(query, { 
            type: Sequelize.QueryTypes.SELECT 
        });
        
        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des compétences des utilisateurs.' });
    }
};

/**
 * Récupère une compétence utilisateur par identifiant utilisateur.
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Compétence utilisateur trouvée.
 */
const getUserSkillById = async (req, res) => {
    try {
        const { user } = req.params;

        const userSkill = await UserSkill.findOne({
            where: {
                user_uuid: user,
            },
        });

        if (!userSkill) { 
            return res.status(404).json({ message: 'Compétence utilisateur non trouvée' });
        }
        res.json(userSkill);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de la compétence utilisateur.' });
    }
};

/**
 * Crée une nouvelle compétence utilisateur.
 * @param {Object} req - Requête HTTP contenant les données de la compétence utilisateur.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Compétence utilisateur créée.
 */
const createNewUserSkill = async (req, res) => {
    try {
        const { user_uuid, skill_id } = req.body;

        const userSkill = await UserSkill.create({ 
            user_uuid, 
            skill_id 
        });

        res.json(userSkill);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la création d\'une compétence utilisateur.' });
    }
};

/**
 * Supprime une compétence utilisateur par identifiant utilisateur.
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Message de confirmation de suppression de la compétence utilisateur.
 */
const deleteUserSkill = async (req, res) => {
    try {
        const { user } = req.params;

        await UserSkill.destroy({
            where: {
                user_uuid: user,
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
