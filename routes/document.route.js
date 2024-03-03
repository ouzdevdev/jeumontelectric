const express = require('express');
const router = express.Router();
const { documentController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

/**
* Route : /api/v1/documents
* Méthode : GET
* Description : Récupérer tous les documents
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Liste de tous les documents
*/
router.route('/')
  .get(veryJWT, documentController.getAllDocuments);

/**
* Route : /api/v1/documents/client
* Méthode : GET
* Description : Récupérer tous les documents d'un client spécifique
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Liste de tous les documents du client spécifié
*/
router.route('/client')
  .get(veryJWT, documentController.getAllDocumentsByClient);

module.exports = router;
