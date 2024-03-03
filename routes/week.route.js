/**
 * @swagger
 * tags:
 *   name: Weeks
 *   description: Opérations liées aux semaines
 */

/**
 * @swagger
 * /api/v1/weeks:
 *   get:
 *     summary: Récupérer tous les annees
 *     tags: [Weeks]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Renvoie tous les semaines
 *       500:
 *         description: Erreur serveur - Impossible de récupérer tous les semaines
 */

const express = require('express');
const router = express.Router();
const { weekController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

/**
* Route : /api/v1/week
* Méthode : GET
* Description : Récupérer toutes les semaines
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Liste de toutes les semaines
*/
router.route('/')
  .get(veryJWT ,weekController.getAllWeeks);
  
module.exports = router;
