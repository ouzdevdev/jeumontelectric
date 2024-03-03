const express = require('express');
const router = express.Router();
const { pieceController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

/**
* Route : /api/v1/pieces
* Méthode : GET
* Description : Récupérer toutes les pièces
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Liste de toutes les pièces
*/
router.route('/')
    .get(veryJWT, pieceController.getAllPieces);

/**
* Route : /api/v1/pieces/:piece_uuid
* Méthode : GET
* Description : Récupérer une pièce par ID
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} piece_uuid - L'identifiant de la pièce à récupérer
* @returns {Object} - La pièce spécifiée par ID
*/
router.route('/:piece_uuid')
    .get(veryJWT, pieceController.findPieceById);
    
module.exports = router;
