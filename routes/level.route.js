/**
 * @swagger
 * tags:
 *   name: Levels
 *   description: Opérations liées aux niveaux (levels)
 */

/**
 * @swagger
 * /api/v1/levels:
 *   get:
 *     summary: Récupérer tous les niveaux (levels)
 *     tags: [Levels]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Renvoie tous les niveaux (levels)
 *       500:
 *         description: Erreur serveur - Impossible de récupérer tous les niveaux (levels)
 */

/**
 * @swagger
 * /api/v1/levels:
 *   post:
 *     summary: Créer un nouveau niveau (level)
 *     tags: [Levels]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               level_label:
 *                 type: string
 *               level_desc:
 *                 type: string
 *             example:
 *               level_label: "Level x"
 *               level_desc: "Level description"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Succès - Le niveau (level) a été créé avec succès
 *       400:
 *         description: Requête incorrecte - Assurez-vous que le corps de la requête est correctement formaté
 *       500:
 *         description: Erreur serveur - Impossible de créer le niveau (level)
 */


/**
 * @swagger
 * /api/v1/levels/{id}:
 *   get:
 *     summary: Récupérer un niveau (level) par ID
 *     tags: [Levels]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du niveau à récupérer
 *         schema:
 *           type: integer
 *         example: 1
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Renvoie le niveau (level) spécifié par ID
 *       404:
 *         description: Introuvable - Aucun niveau (level) trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de récupérer le niveau (level) par ID
 */

/**
 * @swagger
 * /api/v1/levels/{id}:
 *   delete:
 *     summary: Supprimer un niveau (level) par ID
 *     tags: [Levels]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du niveau à supprimer
 *         schema:
 *           type: integer
 *         example: 1
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Le niveau (level) a été supprimé avec succès
 *       404:
 *         description: Introuvable - Aucun niveau (level) trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de supprimer le niveau (level) par ID
 */

const express = require('express');
const router = express.Router();
const { levelController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

/**
* Route : /api/v1/levels
* Méthode : GET
* Description : Récupérer tous les niveaux
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Liste de tous les niveaux
*/
router.route('/')
    .get(veryJWT, levelController.getAllLevels)    

/**
* Route : /api/v1/levels
* Méthode : POST
* Description : Créer un nouveau niveau
* Authentification requise : Oui
* Permissions requises : N/A
* @body {Object} levelData - Les données du niveau à créer
* @returns {Object} - Le niveau créé
*/
    .post(veryJWT, levelController.createNewLevel);

/**
* Route : /api/v1/levels/:id
* Méthode : GET
* Description : Récupérer un niveau par ID
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant du niveau à récupérer
* @returns {Object} - Le niveau spécifié par ID
*/
router.route('/:id')
    .get(veryJWT, levelController.getLevelById)   

/**
* Route : /api/v1/levels/:id
* Méthode : DELETE
* Description : Supprimer un niveau par ID
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant du niveau à supprimer
* @returns {Object} - Confirmation de la suppression du niveau
*/
    .delete(veryJWT, levelController.deleteLevel);
    
module.exports = router;
