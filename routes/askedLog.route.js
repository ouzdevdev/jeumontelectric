const express = require('express');
const router = express.Router();
const { askedLogController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

/**
* Route : /api/v1/asked/logs/list
* Méthode : GET
* Description : Récupérer tous les logs des éléments demandés
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Liste de tous les logs des éléments demandés
*/
router.route('/list')
  .get(veryJWT, askedLogController.getAllAsked);

/**
* Route : /api/v1/asked/logs/:id
* Méthode : GET
* Description : Récupérer tous les logs d'un élément demandé spécifique
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant de l'élément demandé
* @returns {Object} - Liste de tous les logs de l'élément demandé spécifié
*/
router.route('/:id')
  .get(veryJWT, askedLogController.getAllAskedLogsByAsked);

/**
* Route : /api/v1/asked/logs
* Méthode : POST
* Description : Créer un nouveau log pour un élément demandé
* Authentification requise : Oui
* Permissions requises : N/A
* @body {Object} logData - Les données du log à créer
* @returns {Object} - Le log créé pour l'élément demandé
*/
router.route('/')
  .post(veryJWT, askedLogController.createNewAskedLog);

/**
* Route : /api/v1/asked/logs/last/log
* Méthode : GET
* Description : Récupérer le dernier log créé pour un élément demandé
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Le dernier log créé pour un élément demandé
*/
router.route('/last/log')
  .get(veryJWT, askedLogController.getLastCreatedAskedLog);

module.exports = router;
