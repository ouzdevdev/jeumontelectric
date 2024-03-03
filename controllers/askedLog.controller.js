// askedLog.controller.js
const { Sequelize, Op } = require('sequelize');
const sequelize = require('../config/db');
const { AskedLog, User, AskedLogType, Asked } = require('../models');

/**
* @function getAllAsked
* @description Récupère les logs d'asked en fonction des filtres spécifiés.
* @param {Number} page - nombre page.
* @param {Number} pageSize - nombres des logs par page.
* @param {Number} selectedLogType - log type.
* @param {Date} startDate - Date.
* @param {Date} endDate - Date.
* @returns {Object} - Liste des logs d'asked avec le nombre total de logs.
*/
const getAllAsked = async (req, res) => {
    try {

        const { 
            page = 1, 
            pageSize = 10,
            selectedLogType,
            startDate, 
            endDate
        } = req.query;
        
        const offset = (page - 1) * pageSize;
        
        const dateConditions = {};

        if (startDate) {
            dateConditions[Op.gte] = new Date(startDate);
        }

        if (endDate) {
            dateConditions[Op.lte] = new Date(endDate);
        }

        const whereClause = {
            asked_log_type_id: {
                [Op.and]: [
                    parseInt(selectedLogType) !== 0 ? { [Op.eq]: selectedLogType } : { [Op.ne]: 0 } 
                ]
            }
        };

        if (Object.keys(dateConditions).length > 0) {
            whereClause.asked_log_created_date = { ...dateConditions };
        }
    
        const count = await AskedLog.count({
            where: whereClause
        });
        const logs = await AskedLog.findAll({
            where: whereClause,
            order: [
                ['asked_log_created_date', 'DESC']
            ],
            offset,
            limit: pageSize,
            include: [
                { model: Asked }, { model: User }, { model: AskedLogType }
            ]
        });
    
        if (!logs.length) {
            return res.status(404).json({ message: 'No Logs found' });
        }
    
        res.json({
            logs,
            count
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching asked log', error: error.message });
    }
}

/**
* @function getAllAskedLogsByAsked
* @description Récupère tous les logs d'asked pour un asked spécifique.
* @param {String | uuid} id - L'identifiant de asked log.
* @returns {Object} - Liste des logs d'asked pour l'asked spécifié.
*/
const getAllAskedLogsByAsked = async (req, res) => {
    try {
        const { id } = req.params

        const askedLogs = await AskedLog.findAll({ 
            where: { asked_uuid: id } ,
            include: [
                {
                    model: User,
                } , {
                    model: AskedLogType,
                }
            ],
            order: [['asked_log_created_date', 'DESC']], 
        });
        
        res.status(201).json(askedLogs);


    } catch (error) {
        res.status(500).json({ message: 'Error fetching asked log', error: error.message });
    }
}

/**
* @function getLastCreatedAskedLog
* @description Récupère le dernier type de log d'asked créé dans les deux dernières semaines.
* @returns {Object} - Le dernier type de log d'asked créé.
*/
const getLastCreatedAskedLog = async (req, res) => {
    try {

        const lastAskedLogQuery = `
            SELECT
                backend.asked_log.asked_log_uuid,
                backend.asked_log.asked_log_text,
                backend.asked_log.asked_log_created_date,
                backend.asked_log_type.asked_log_type_label,
                backend.asked.asked_ref,
                backend.asked.asked_uuid,
                backend.user.user_uuid,
                backend.user.user_name,
                backend.user.user_first_name
            FROM backend.asked_log
            INNER JOIN backend.asked_log_type ON backend.asked_log.asked_log_type_id = backend.asked_log_type.asked_log_type_id 
            INNER JOIN backend.asked ON backend.asked_log.asked_uuid = backend.asked.asked_uuid
            INNER JOIN backend.user ON backend.asked_log.user_uuid = backend.user.user_uuid
            WHERE backend.asked_log.asked_log_created_date >= NOW() - INTERVAL '2 weeks'
            GROUP BY
                backend.asked_log.asked_log_uuid,
                backend.asked_log.asked_log_text,
                backend.asked_log.asked_log_created_date,
                backend.asked_log_type.asked_log_type_label,
                backend.asked.asked_ref,
                backend.asked.asked_uuid,
                backend.user.user_uuid,
                backend.user.user_name,
                backend.user.user_first_name
            ORDER BY backend.asked_log.asked_log_created_date DESC;
        `;
       
        const results = await  sequelize.query(lastAskedLogQuery, { type: Sequelize.QueryTypes.SELECT })
        
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching asked log', error: error });
    }
};

/**
* @function createNewAskedLog
* @description Crée un nouveau de log d'asked.
* @param {String} asked_log_text - Text.
* @param {Number} asked_log_type_id - Log type.
* @param {String | uuid} asked_uuid - asked.
* @param {String | uuid} user_uuid - utilisateur.
* @returns {Object} - Le log d'asked créé.
*/
const createNewAskedLog = async (req, res) => {
    try {
        const { asked_log_text, asked_log_type_id, asked_uuid, user_uuid } = req.body;
    
        const askedLog = await AskedLog.create({ 
            asked_log_text, 
            asked_log_type_id, 
            asked_uuid, 
            user_uuid
         });
    
        res.status(201).json(askedLog);
    } catch (error) {
        res.status(400).json({ message: 'Invalid asked tag type data received', error: error.message });
    }
}

module.exports = {
    getAllAsked,
    getAllAskedLogsByAsked,
    getLastCreatedAskedLog,
    createNewAskedLog
}
