// document.controller.js
const { Op, literal } = require('sequelize');
const { DocumentInterne, Categorie, User } = require('../models');
const sequelize = require('../config/db');

/**
* Nom de la fonction : getAllDocuments
* Description : Récupère tous les documents avec des filtres optionnels.
* @param {Number} page - Le numéro de la page à afficher.
* @param {Number} pageSize - La taille de la page.
* @param {String} containsText - Le texte contenu dans la description du document.
* @param {String} doesNotContainText - Le texte qui ne doit pas être contenu dans la description du document.
* @param {String} linkedWordsText - Le texte lié contenu dans la description du document.
* @param {Number} selectedCategory - L'ID de la catégorie sélectionnée.
* @param {Number} minSize - La taille minimale du document.
* @param {Number} maxSize - La taille maximale du document.
* @param {Date} startDate - La date de début pour filtrer les documents par date de création.
* @param {Date} endDate - La date de fin pour filtrer les documents par date de création.
* @returns {Object} - Les documents correspondant aux critères de recherche.
* @throws {Error} - Erreur si la récupération des documents échoue.
* @example
* // Exemple d'appel de la fonction
* getAllDocuments(1, 10, 'texte', '', 'mot', 1, 100, 200, '2023-01-01', '2024-01-01');
*/
const getAllDocuments = async (req, res) => {
    try {
        const { 
            page = 1, 
            pageSize = 10,
            containsText, 
            doesNotContainText, 
            linkedWordsText, 
            selectedCategory,
            minSize, 
            maxSize, 
            startDate, 
            endDate
        } = req.query;

        const offset = (page - 1) * pageSize;

        const whereConditions = {
            doc_description: {
                [Op.and]: []
            },
            cat_id: {
                [Op.and]: []
            },
            doc_size: {
                [Op.and]: []
            }
        };

        // Filtrage par texte contenu
        if ( containsText !== 'undefined' && containsText !== '' ) {
            whereConditions.doc_description[Op.and].push({ [Op.iLike]: `%${containsText}%` });
        }

        // Filtrage par texte ne contenant pas
        if (doesNotContainText !== undefined && doesNotContainText !== '') {
            const doesNotContainTextLowerCase = doesNotContainText.toLowerCase();
        
            whereConditions.doc_description[Op.and].push(
                literal(`LOWER(doc_description) NOT LIKE LOWER('%${doesNotContainTextLowerCase}%')`)
            );
        }        

        // Filtrage par texte lié
        if ( linkedWordsText !== 'undefined' && linkedWordsText !== '' ) {
            whereConditions.doc_description[Op.and].push({ [Op.iLike]: `%${linkedWordsText}%` });
        }

        // Filtrage par catégorie
        if (selectedCategory !== undefined && !isNaN(selectedCategory)) {
            whereConditions.cat_id[Op.and].push({ [Op.eq]: parseInt(selectedCategory) });
        }

        // Filtrage par taille
        if (minSize !== undefined && maxSize !== undefined && !isNaN(minSize) && !isNaN(maxSize)) {
            whereConditions.doc_size[Op.and].push({
                [Op.between]: [parseInt(minSize), parseInt(maxSize)]
            });
        } else if (minSize !== undefined && !isNaN(minSize)) {
            whereConditions.doc_size[Op.and].push({
                [Op.gte]: parseInt(minSize)
            });
        } else if (maxSize !== undefined && !isNaN(maxSize)) {
            whereConditions.doc_size[Op.and].push({
                [Op.lte]: parseInt(maxSize)
            });
        }
                
        // Filtrage par date de création
        if ( startDate !== 'undefined' && endDate !== 'undefined' ) {
            whereConditions.doc_created_date = {
                [Op.between]: [startDate, endDate]
            };
        }

        // Compte le nombre total de documents correspondant aux critères
        const count = await DocumentInterne.count({
            where: whereConditions,
        });

        // Récupère les documents avec pagination et jointures
        const documentsinterne = await DocumentInterne.findAll({
            where: whereConditions,
            order: [
                ['doc_created_date', 'DESC']
            ], 
            offset,
            limit: pageSize,
            include: [
                {
                    model: Categorie,
                },
                {
                    model: User,
                }
            ]
        });

        res.json({
            documentsinterne,
            count
        });
    } catch (error) {
        res.status(500).json({ 
            message: error.message, 
            error: error 
        });
    }
};

/**
* Nom de la fonction : getAllDocumentsByClient
* Description : Récupère tous les documents liés à un client spécifique.
* @param {String} client - L'UUID du client.
* @returns {Object} - Les documents associés au client spécifié.
* @throws {Error} - Erreur si la récupération des documents échoue.
* @example
* // Exemple d'appel de la fonction
* getAllDocumentsByClient('client_uuid');
*/
const getAllDocumentsByClient = async (req, res) => {
    try {
        
        const { 
            client
        } = req.query;

        const documents = await DocumentInterne.findAll({
            where: {
                user_uuid: client      
            },
            order: [
                ['doc_created_date', 'DESC']
            ], 
            include: [
                {
                    model: Categorie,
                },
            ]
        });

        if (!documents.length) {
            return res.status(404).json({ message: 'No documents found' });
        }

        res.json(documents);
    } catch (error) {
        res.status(500).json({ 
            message: error.message, 
            error: error 
        });
    }
}

module.exports = {
    getAllDocuments,
    getAllDocumentsByClient
}
