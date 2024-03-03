const express = require('express');
const router = express.Router();
const { equipementInterneController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

/**
* Route : /api/v1/equipementsInternes
* Méthode : GET
* Description : Récupérer tous les équipements internes
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Liste de tous les équipements internes
*/
router.route('/')
    .get(veryJWT, equipementInterneController.getAllEquipementInternes);

/**
* Route : /api/v1/equipementsInternes/:piece_uuid
* Méthode : GET
* Description : Rechercher un équipement interne par ID de pièce
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} piece_uuid - L'UUID de la pièce pour laquelle rechercher l'équipement interne
* @returns {Object} - L'équipement interne associé à l'UUID de la pièce spécifié
*/
router.route('/:piece_uuid')
    .get(veryJWT, equipementInterneController.findEquipementInterneById);
    
module.exports = router;
