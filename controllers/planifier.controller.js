// planifier.controller.js
const { Planifier, User, UserSkill, Role } = require('../models');
const path = require('path');
const {  Sequelize } = require('sequelize');
const sequelize = require('../config/db');
const { sendEmailPlanifier } = require('../utils/emailService');

/**
 * Recherche les planificateurs de garde.
 * @route GET /api/oncall
 * @access Privé
 * @returns {Object} - Les planificateurs de garde récupérés.
 * @throws {Error} - Une erreur si la récupération des planificateurs de garde échoue.
 * @example
 * // Exemple d'appel de la fonction
 * findPlanifiers(req, res);
 */
const findPlanifiers = async (req, res) => {
    try {

        const query = `
            SELECT
                u.user_uuid,
                u.user_email,
                u.user_name,
                u.user_first_name,
                u.role_id,
                us.skill_id,
                cs.primary_backup,
                cs.emergency_backup,
                cs.week_id,
                cs.year_id,
                cs.reason
            FROM backend.on_call_support cs
            INNER JOIN backend.user u ON cs.user_uuid = u.user_uuid
            LEFT JOIN backend.user_skill us ON cs.user_uuid = us.user_uuid
            WHERE cs.primary_backup = true OR cs.emergency_backup = true;
        `;

        const results = await  sequelize.query(query, { 
            type: Sequelize.QueryTypes.SELECT 
        });
        
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ 
            message: 'Erreur lors de la recherche de la permanence', 
            error: error 
        });
    }
};

/**
 * Recherche un planificateur de garde par son ID.
 * @route GET /api/oncall/:user/:year/:week
 * @access Privé
 * @param {string} user - L'UUID de l'utilisateur.
 * @param {string} year - L'année.
 * @param {string} week - La semaine.
 * @returns {Object} - Le planificateur de garde trouvé.
 * @throws {Error} - Une erreur si la récupération du planificateur de garde échoue.
 * @example
 * // Exemple d'appel de la fonction
 * findPlanifiersById(req, res);
 */
const findPlanifiersById = async (req, res) => {
    try {

        const {user, year, week} = req.params;

        const onCall = await Planifier.findOne({
            include: [{
                model: User,
                include: [{
                    model: Role
                }]
            }],
            where: {
                user_uuid: user,
                week_id: week,
                year_id: year
            }
        });

        const userSkill = await UserSkill.findOne({
            where: { user_uuid: user }
        })

        res.status(200).json({
            onCall, 
            userSkill
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Erreur lors de la recherche de la permanence', 
            error: error.message 
        });
    }
};


/**
 * Recherche les planificateurs de garde par semaine et année.
 * @route GET /api/oncall/:year/:week
 * @access Privé
 * @param {string} year - L'année.
 * @param {string} week - La semaine.
 * @returns {Object} - Les planificateurs de garde trouvés.
 * @throws {Error} - Une erreur si la recherche des planificateurs de garde échoue.
 * @example
 * // Exemple d'appel de la fonction
 * findPlanifiersByWeekYear(req, res);
 */
const findPlanifiersByWeekYear = async (req, res) => {
    try {

        const {year, week} = req.params;
        
        const query = `
            SELECT
                *
            FROM backend.on_call_support
            INNER JOIN backend.user ON backend.on_call_support.user_uuid = backend.user.user_uuid
            LEFT JOIN backend.user_skill ON backend.on_call_support.user_uuid = backend.user_skill.user_uuid
            WHERE (backend.on_call_support.primary_backup = true OR backend.on_call_support.emergency_backup = true)
            AND backend.on_call_support.week_id = ${week} AND backend.on_call_support.year_id = ${year};
        `;
        
        const results = await  sequelize.query(query, { type: Sequelize.QueryTypes.SELECT })
        
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ 
            message: 'Erreur lors de la recherche de la permanence', 
            error: error.message 
        });
    }
};


/**
 * Crée un nouveau planificateur de garde.
 * @route POST /api/oncall
 * @access Privé
 * @param {string} user_uuid - L'UUID de l'utilisateur.
 * @param {string} week_id - L'ID de la semaine.
 * @param {string} year_id - L'ID de l'année.
 * @param {boolean} primary_backup - Indique si c'est une sauvegarde principale.
 * @param {boolean} emergency_backup - Indique si c'est une sauvegarde d'urgence.
 * @returns {Object} - Le nouveau planificateur de garde créé.
 * @throws {Error} - Une erreur si la création du planificateur de garde échoue.
 * @example
 * // Exemple d'appel de la fonction
 * createPlanifier(req, res);
 */
const createPlanifier = async (req, res) => {
    try {
        const {
            user_uuid,  
            week_id,
            year_id,  
            primary_backup,
            emergency_backup 
        } = req.body;


        if (primary_backup){
            const findPrimary = await Planifier.findOne({
                where : {
                    week_id,
                    year_id,
                    primary_backup: true,
                }           
            })
    
            if (findPrimary) {
                return res.status(400).json({ message: 'User primary == 1' });
            }
        }


        if (emergency_backup) {
            const findEmergency = await  Planifier.count({
                where : {
                    week_id,
                    year_id,
                    emergency_backup: true,
                }           
            }) 
    
            if (findEmergency === 2) {
                return res.status(400).json({ message: 'User Emergency == 2' });
            } 
        }



        const newOnCall = await Planifier.create({
            user_uuid,  
            week_id,
            year_id,  
            reason: `${week_id} -- ${year_id}`,
            primary_backup,
            emergency_backup
        });

        const user = await User.findOne({ 
            where: { user_uuid } ,
            attributes: { exclude: ['user_password'] }, 
        });

        const data = {
            user_name: user.user_name,
            week_id: week_id,
            year_id: year_id
        };

        const templatePath = path.join(__dirname, '..', 'public', 'mail', 'supportTechInformation.html');
        sendEmailPlanifier(user.user_email, "Support", templatePath, data);

        res.status(201).json(newOnCall);
    } catch (error) {
        res.status(500).json({ 
            message: 'Erreur lors de la création de la permanence', 
            error: error 
        });
    }
};

module.exports = {
    createPlanifier,
    findPlanifiers,
    findPlanifiersById,
    findPlanifiersByWeekYear
};
