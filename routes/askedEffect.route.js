const express = require('express');
const router = express.Router();
const { askedEffectController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

/**
* Route : /api/v1/asked/:asked_uuid
* Méthode : GET
* Description : Récupérer tous les effets liés à un élément demandé spécifique
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} asked_uuid - L'UUID de l'élément demandé
* @returns {Object} - Liste des effets liés à l'élément demandé spécifié
*/
router.route('/:asked_uuid')
  .get(veryJWT, askedEffectController.getAllEffectByAsked);

/**
* Route : /api/v1/asked
* Méthode : POST
* Description : Créer un effet pour un élément demandé
* Authentification requise : Oui
* Permissions requises : N/A
* @body {Object} effectData - Les données de l'effet à créer
* @returns {Object} - L'effet créé pour l'élément demandé
*/
router.route('/')
  .post(veryJWT, askedEffectController.createEffectForAsked);

/**
* Route : /api/v1/asked/:asked_uuid/:effect_id/:user_uuid
* Méthode : DELETE
* Description : Supprimer un effet lié à un élément demandé
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} asked_uuid - L'UUID de l'élément demandé
* @param {string} effect_id - L'UUID de l'effet à supprimer
* @param {string} user_uuid - L'UUID de l'utilisateur qui supprime l'effet
* @returns {Object} - Confirmation de la suppression de l'effet de l'élément demandé
*/
router.route('/:asked_uuid/:effect_id/:user_uuid')
  .delete(veryJWT, askedEffectController.deleteEffectFromAsked);

module.exports = router;
