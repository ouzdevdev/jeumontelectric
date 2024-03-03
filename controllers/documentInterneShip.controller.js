// documentInterneShip.controller.js
const { DocumentInterne, Ship, DocumentInterneShip, Categorie } = require('../models');

/**
* Nom de la fonction : getAllDocumentsByShip
* Description : Récupère tous les documents internes associés à un navire spécifique.
* @param {Number} page - Le numéro de la page à afficher.
* @param {Number} pageSize - La taille de la page.
* @param {String} ship - L'UUID du navire.
* @returns {Object} - Les documents internes associés au navire spécifié.
* @throws {Error} - Erreur si la récupération des documents échoue.
* @example
* // Exemple d'appel de la fonction
* getAllDocumentsByShip(req, res);
*/
const getAllDocumentsByShip = async (req, res) => {
    try {
        const { 
            page = 1, 
            pageSize = 10,
        } = req.query;

        const offset = (page - 1) * pageSize;

        const { ship } = req.params;

        // Compte le nombre total de documents associés au navire
        const count = await DocumentInterneShip.count({});

        // Récupère les documents internes associés au navire avec pagination et jointures
        const documents = await DocumentInterneShip.findAll({
            where: {
                ship_uuid: ship      
            },
            offset,
            limit: pageSize,
            include: [
                {
                    model: DocumentInterne,
                    include: [{
                        model: Categorie
                    }]
                },
                {
                    model: Ship,
                }
            ]
        });

        if (!documents.length) {
            return res.status(404).json({ message: 'No documents found' });
        }

        // Extrait les documents internes de la liste des documents associés au navire
        const documentsInterne = documents.map(doc => doc.DocumentInterne);

        res.json({ 
            count,
            documentsInterne
        });
    } catch (error) {
        res.status(500).json({ 
            message: error.message, 
            error: error 
        });
    }
}

module.exports = {
    getAllDocumentsByShip
}
