const express = require('express');
const router = express.Router();
const { askedUserInChargeOfController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

/**
* Route : /api/v1/asked/inchargeof/:asked
* Méthode : GET
* Description : Récupérer l'utilisateur en charge d'un élément demandé spécifique
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} asked - L'UUID de l'élément demandé
* @returns {Object} - L'utilisateur en charge de l'élément demandé spécifié
*/
router.route('/:asked')
  .get(veryJWT, askedUserInChargeOfController.getUserByAskedInChargeOf);

/**
* Route : /api/v1/asked/inchargeof
* Méthode : POST
* Description : Définir un utilisateur en charge d'un élément demandé
* Authentification requise : Oui
* Permissions requises : N/A
* @body {Object} userData - Les données de l'utilisateur en charge (ID de l'utilisateur, ID de l'élément demandé)
* @returns {Object} - L'utilisateur en charge de l'élément demandé spécifié
*/
router.route('/')
  .post(veryJWT, askedUserInChargeOfController.createAskUsr);

module.exports = router;
