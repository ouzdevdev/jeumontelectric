// categorie.controller.js
const { Categorie } = require('../models');

/**
* Nom de la fonction : getAllCategories
* Description : Récupère toutes les catégories.
* @returns {Object} - Un tableau contenant toutes les catégories.
* @throws {Error} - Erreur si la récupération des catégories échoue.
* @example
* // Exemple d'appel de la fonction
* getAllCategories();
*/
const getAllCategories = async (req, res) => {
    try {
        const categories = await Categorie.findAll();
        
        // Vérifie s'il y a des catégories récupérées
        if (!categories.length) {
            return res.status(404).json({ message: 'No categories found' });
        }

        // Répond avec les catégories récupérées
        res.json(categories);

    } catch (error) {
        // En cas d'erreur, répond avec un message d'erreur et l'erreur rencontrée
        res.status(500).json({ 
            message: error.message, 
            error: error 
        });
    }
}

module.exports = {
    getAllCategories
}
