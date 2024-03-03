const express = require('express');
const router = express.Router();
const { documentInterneShipController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

/**
* Route : /api/v1/documents/:ship
* Méthode : GET
* Description : Récupérer tous les documents internes associés à un navire spécifique
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} ship - L'identifiant du navire pour lequel récupérer les documents internes
* @returns {Object} - Liste de tous les documents internes associés au navire spécifié
*/
router.route('/:ship')
  .get(veryJWT, documentInterneShipController.getAllDocumentsByShip);

module.exports = router;
