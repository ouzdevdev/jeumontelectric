/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Opérations liées aux rôles
 */

/**
 * @swagger
 * /api/v1/roles:
 *   get:
 *     summary: Récupérer tous les rôles
 *     tags: [Roles]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Renvoie tous les rôles
 *       500:
 *         description: Erreur serveur - Impossible de récupérer tous les rôles
 */

/**
 * @swagger
 * /api/v1/roles:
 *   post:
 *     summary: Créer un nouveau rôle
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role_label:
 *                 type: string
 *               role_description:
 *                 type: string
 *             example:
 *               role_label: "Role Label"
 *               role_description: "Role description"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Succès - Le rôle a été créé avec succès
 *       400:
 *         description: Requête incorrecte - Assurez-vous que le corps de la requête est correctement formaté
 *       500:
 *         description: Erreur serveur - Impossible de créer le rôle
 */

/**
 * @swagger
 * /api/v1/roles/{id}:
 *   get:
 *     summary: Récupérer un rôle par ID
 *     tags: [Roles]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du rôle à récupérer
 *         schema:
 *           type: integer
 *         example: 1
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Renvoie le rôle spécifié par ID
 *       404:
 *         description: Introuvable - Aucun rôle trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de récupérer le rôle par ID
 */

/**
 * @swagger
 * /api/v1/roles/{id}:
 *   delete:
 *     summary: Supprimer un rôle par ID
 *     tags: [Roles]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du rôle à supprimer
 *         schema:
 *           type: integer
 *         example: 1
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Le rôle a été supprimé avec succès
 *       404:
 *         description: Introuvable - Aucun rôle trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de supprimer le rôle
 */

const express = require('express');
const router = express.Router();
const { roleController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

/**
* Route : /api/v1/roles
* Méthode : GET
* Description : Récupérer tous les rôles
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Liste de tous les rôles
*/
router.route('/')
    .get(veryJWT, roleController.getAllRoles)     

/**
* Route : /api/v1/roles
* Méthode : POST
* Description : Créer un nouveau rôle
* Authentification requise : Oui
* Permissions requises : N/A
* @body {Object} roleData - Les données du rôle à créer
* @returns {Object} - Le rôle créé
*/
    .post(veryJWT, roleController.createNewRole); 

/**
* Route : /api/v1/roles/:id
* Méthode : GET
* Description : Récupérer un rôle par ID
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant du rôle à récupérer
* @returns {Object} - Le rôle spécifié par ID
*/
router.route('/:id')
    .get(veryJWT, roleController.getRoleById)    

/**
* Route : /api/v1/roles/:id
* Méthode : DELETE
* Description : Supprimer un rôle par ID
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant du rôle à supprimer
* @returns {Object} - Confirmation de la suppression du rôle
*/
    .delete(veryJWT, roleController.deleteRole); 

module.exports = router;
