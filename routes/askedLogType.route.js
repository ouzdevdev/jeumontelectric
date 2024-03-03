const express = require('express');
const router = express.Router();
const { askedTypeLogController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

/**
* Route : /api/v1/asked/logtypes
* Méthode : GET
* Description : Récupérer tous les types de logs des éléments demandés
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Liste de tous les types de logs des éléments demandés
*/
router.route('/')
  .get(veryJWT, askedTypeLogController.getAllAskedLogTypes)

/**
* Route : /api/v1/asked/logtypes
* Méthode : POST
* Description : Créer un nouveau type de log pour les éléments demandés
* Authentification requise : Oui
* Permissions requises : N/A
* @body {Object} logTypeData - Les données du type de log à créer
* @returns {Object} - Le type de log créé pour les éléments demandés
*/
  .post(veryJWT, askedTypeLogController.createNewAskedLogType);

module.exports = router;
