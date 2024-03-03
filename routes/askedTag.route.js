const express = require('express');
const router = express.Router();
const { askedTagController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

/**
* Route : /api/v1/asked/tags/:asked_uuid
* Méthode : GET
* Description : Récupérer tous les tags associés à un élément demandé spécifique
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} asked_uuid - L'UUID de l'élément demandé
* @returns {Object} - Liste de tous les tags associés à l'élément demandé spécifié
*/
router.route('/:asked_uuid')
  .get(veryJWT, askedTagController.getAllTagsByAsked);

/**
* Route : /api/v1/asked/tags
* Méthode : POST
* Description : Créer un tag pour un élément demandé
* Authentification requise : Oui
* Permissions requises : N/A
* @body {Object} tagData - Les données du tag à créer
* @returns {Object} - Le tag créé pour l'élément demandé
*/
router.route('/')
  .post(veryJWT, askedTagController.createTagForAsked);

/**
* Route : /api/v1/asked/tags/:asked_uuid/:tag_id/:user_uuid
* Méthode : DELETE
* Description : Supprimer un tag associé à un élément demandé
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} asked_uuid - L'UUID de l'élément demandé
* @param {string} tag_id - L'UUID du tag à supprimer
* @param {string} user_uuid - L'UUID de l'utilisateur qui supprime le tag
* @returns {Object} - Confirmation de la suppression du tag de l'élément demandé
*/
router.route('/:asked_uuid/:tag_id/:user_uuid')
  .delete(veryJWT, askedTagController.deleteTagFromAsked);

module.exports = router;
