/**
 * @swagger
 * tags:
 *   name: PRMA
 *   description: Opérations liées aux PRMA items (à remplacer par le nom approprié)
 */

/**
 * @swagger
 * /api/v1/prma:
 *   get:
 *     summary: Récupérer tous les PRMA items
 *     tags: [PRMA]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Renvoie tous les PRMA items
 *       500:
 *         description: Erreur serveur - Impossible de récupérer tous les PRMA items
 */

/**
 * @swagger
 * /api/v1/prma/{id}:
 *   get:
 *     summary: Récupérer un PRMA item par ID
 *     tags: [PRMA]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du PRMA item à récupérer
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "xxxxx-xxxx-xxxx-xxxxx-xxxxxxx"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Renvoie le PRMA item spécifié par ID
 *       404:
 *         description: Introuvable - Aucun PRMA item trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de récupérer le PRMA item par ID
 */

const express = require('express');
const router = express.Router();
const { prmaController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

/**
* Route : /api/v1/prma
* Méthode : GET
* Description : Récupérer tous les PRMA (Preventive Maintenance Reports)
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Liste de tous les PRMA
*/
router.route('/') 
  .get(veryJWT, prmaController.getAllPRMA)

/**
* Route : /api/v1/prma
* Méthode : POST
* Description : Créer un nouveau PRMA (Preventive Maintenance Report)
* Authentification requise : Oui
* Permissions requises : N/A
* @body {Object} prmaData - Les données du PRMA à créer
* @returns {Object} - Le PRMA créé
*/
  .post(veryJWT, prmaController.createPRMA);

/**
* Route : /api/v1/prma/:id
* Méthode : GET
* Description : Récupérer un PRMA par ID
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant du PRMA à récupérer
* @returns {Object} - Le PRMA correspondant à l'ID spécifié
*/
router.route('/:id')
  .get(veryJWT, prmaController.getPRMAById);
  
/**
* Route : /api/v1/prma/:id/:user_uuid
* Méthode : PUT
* Description : Mettre à jour un PRMA
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant du PRMA à mettre à jour
* @param {string} user_uuid - L'identifiant de l'utilisateur
* @returns {Object} - Le PRMA mis à jour
*/
router.route('/:id/:user_uuid')
  .put(veryJWT, prmaController.updatePRMA);

module.exports = router;