/**
 * @swagger
 * tags:
 *   name: Years
 *   description: Opérations liées aux annees
 */

/**
 * @swagger
 * /api/v1/years:
 *   get:
 *     summary: Récupérer tous les annees
 *     tags: [Years]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Renvoie tous les annees
 *       500:
 *         description: Erreur serveur - Impossible de récupérer tous les annees
 */

const express = require('express');
const router = express.Router();
const { yearController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

/**
* Route : /api/v1/year
* Méthode : GET
* Description : Récupérer tous les années
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Liste de tous les années
*/
router.route('/')
  .get(veryJWT ,yearController.getAllYears);
  
module.exports = router;
