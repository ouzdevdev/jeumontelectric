const express = require('express');
const router = express.Router();
const { planifierController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

/**
* Route : /api/v1/planifiers
* Méthode : GET
* Description : Récupérer tous les planificateurs
* Authentification requise : Non
* Permissions requises : N/A
* @returns {Object} - Liste de tous les planificateurs
*/
router.route('/') 
  .get(planifierController.findPlanifiers)

/**
* Route : /api/v1/planifiers
* Méthode : POST
* Description : Créer un nouveau planificateur
* Authentification requise : Oui
* Permissions requises : N/A
* @body {Object} planifierData - Les données du planificateur à créer
* @returns {Object} - Le planificateur créé
*/
  .post(veryJWT, planifierController.createPlanifier); 

/**
* Route : /api/v1/planifiers/user/:user/:week/:year
* Méthode : GET
* Description : Récupérer les planificateurs par ID utilisateur, semaine et année
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} user - L'identifiant de l'utilisateur
* @param {number} week - Le numéro de semaine
* @param {number} year - L'année
* @returns {Object} - Liste des planificateurs correspondants aux critères spécifiés
*/
router.route('/user/:user/:week/:year')
  .get(veryJWT, planifierController.findPlanifiersById);

/**
* Route : /api/v1/planifiers/:week/:year
* Méthode : GET
* Description : Récupérer les planificateurs par semaine et année
* Authentification requise : Oui
* Permissions requises : N/A
* @param {number} week - Le numéro de semaine
* @param {number} year - L'année
* @returns {Object} - Liste des planificateurs correspondants aux critères spécifiés
*/
router.route('/:week/:year')
  .get(veryJWT, planifierController.findPlanifiersByWeekYear);

module.exports = router;
