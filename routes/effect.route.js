/**
 * @swagger
 * tags:
 *   name: Effects
 *   description: Opérations liées aux effets (effects)
 */

/**
 * @swagger
 * /api/v1/effects:
 *   get:
 *     summary: Récupérer tous les effets (effects)
 *     tags: [Effects]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Renvoie tous les effets (effects)
 *       500:
 *         description: Erreur serveur - Impossible de récupérer tous les effets (effects)
 */

/**
 * @swagger
 * /api/v1/effects:
 *   post:
 *     summary: Créer un nouvel effet (effect)
 *     tags: [Effects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               effect_label:
 *                 type: string
 *               effect_description:
 *                 type: string
 *             example:
 *               effect_label: "Effect label"
 *               effect_description: "Effect description ..."
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Succès - L'effet (effect) a été créé avec succès
 *       400:
 *         description: Requête incorrecte - Assurez-vous que le corps de la requête est correctement formaté
 *       500:
 *         description: Erreur serveur - Impossible de créer l'effet (effect)
 */

/**
 * @swagger
 * /api/v1/effects/{id}:
 *   get:
 *     summary: Récupérer un effet (effect) par ID
 *     tags: [Effects]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de l'effet à récupérer
 *         schema:
 *           type: integer
 *         example: 1
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Renvoie l'effet (effect) spécifié par ID
 *       404:
 *         description: Introuvable - Aucun effet (effect) trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de récupérer l'effet (effect) par ID
 */

/**
 * @swagger
 * /api/v1/effects/{id}:
 *   delete:
 *     summary: Supprimer un effet (effect) par ID
 *     tags: [Effects]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de l'effet à supprimer
 *         schema:
 *           type: integer
 *         example: 1
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - L'effet (effect) a été supprimé avec succès
 *       404:
 *         description: Introuvable - Aucun effet (effect) trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de supprimer l'effet (effect) par ID
 */

const express = require('express');
const router = express.Router();
const { effectController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

/**
* Route : /api/v1/effects
* Méthode : GET
* Description : Récupérer tous les effets
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Liste de tous les effets
*/
router.route('/')
  .get(veryJWT, effectController.getAllEffects)   

/**
* Route : /api/v1/effects
* Méthode : POST
* Description : Créer un nouvel effet
* Authentification requise : Oui
* Permissions requises : N/A
* @body {Object} effectData - Les données de l'effet à créer
* @returns {Object} - L'effet créé
*/  
  .post(veryJWT, effectController.createNewEffect);
  
/**
* Route : /api/v1/effects/:id
* Méthode : GET
* Description : Récupérer un effet par ID
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant de l'effet à récupérer
* @returns {Object} - L'effet spécifié par ID
*/
router.route('/:id')
  .get(veryJWT, effectController.getEffectById)

/**
* Route : /api/v1/effects/:id
* Méthode : DELETE
* Description : Supprimer un effet par ID
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant de l'effet à supprimer
* @returns {Object} - Confirmation de la suppression de l'effet
*/
  .delete(veryJWT, effectController.deleteEffect);

module.exports = router;
