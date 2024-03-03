/**
 * @swagger
 * tags:
 *   name: Effect Types
 *   description: Opérations liées aux types d'effets (effect types)
 */

/**
 * @swagger
 * /api/v1/effectTypes:
 *   get:
 *     summary: Récupérer tous les types d'effets (effect types)
 *     tags: [Effect Types]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Renvoie tous les types d'effets (effect types)
 *       500:
 *         description: Erreur serveur - Impossible de récupérer tous les types d'effets (effect types)
 */

/**
 * @swagger
 * /api/v1/effectTypes:
 *   post:
 *     summary: Créer un nouveau type d'effet (effect type)
 *     tags: [Effect Types]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               effect_type_label:
 *                 type: string
 *               effect_type_description:
 *                 type: string
 *             example:
 *               effect_type_label: "Effect type label"
 *               effect_type_description: "Effect type description ..."
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Succès - Le type d'effet (effect type) a été créé avec succès
 *       400:
 *         description: Requête incorrecte - Assurez-vous que le corps de la requête est correctement formaté
 *       500:
 *         description: Erreur serveur - Impossible de créer le type d'effet (effect type)
 */

/**
 * @swagger
 * /api/v1/effectTypes/{id}:
 *   get:
 *     summary: Récupérer un type d'effet (effect type) par ID
 *     tags: [Effect Types]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du type d'effet à récupérer
 *         schema:
 *           type: integer
 *         example: 1
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Renvoie le type d'effet (effect type) spécifié par ID
 *       404:
 *         description: Introuvable - Aucun type d'effet (effect type) trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de récupérer le type d'effet (effect type) par ID
 */

/**
 * @swagger
 * /api/v1/effectTypes/{id}:
 *   delete:
 *     summary: Supprimer un type d'effet (effect type) par ID
 *     tags: [Effect Types]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du type d'effet à supprimer
 *         schema:
 *           type: integer
 *         example: 1
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Le type d'effet (effect type) a été supprimé avec succès
 *       404:
 *         description: Introuvable - Aucun type d'effet (effect type) trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de supprimer le type d'effet (effect type) par ID
 */

const express = require('express');
const router = express.Router();
const { effectTypeController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

/**
* Route : /api/v1/effectTypes
* Méthode : GET
* Description : Récupérer tous les types d'effets
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Liste de tous les types d'effets
*/
router.route('/')
  .get(veryJWT, effectTypeController.getAllEffects)    

/**
* Route : /api/v1/effectTypes
* Méthode : POST
* Description : Créer un nouveau type d'effet
* Authentification requise : Oui
* Permissions requises : N/A
* @body {Object} effectTypeData - Les données du type d'effet à créer
* @returns {Object} - Le type d'effet créé
*/  
  .post(veryJWT, effectTypeController.createNewEffect); 
  
/**
* Route : /api/v1/effectTypes/:id
* Méthode : GET
* Description : Récupérer un type d'effet par ID
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant du type d'effet à récupérer
* @returns {Object} - Le type d'effet spécifié par ID
*/
router.route('/:id')
  .get(veryJWT, effectTypeController.getEffectById)    

/**
* Route : /api/v1/effectTypes/:id
* Méthode : DELETE
* Description : Supprimer un type d'effet par ID
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant du type d'effet à supprimer
* @returns {Object} - Confirmation de la suppression du type d'effet
*/
  .delete(veryJWT, effectTypeController.deleteEffect); 
  
module.exports = router;
