const express = require('express');
const router = express.Router();
const { categorieController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

/**
* Route : /api/v1/categories
* Méthode : GET
* Description : Récupérer toutes les catégories
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Liste de toutes les catégories
*/
router.route('/')
  .get(veryJWT, categorieController.getAllCategories);

module.exports = router;
