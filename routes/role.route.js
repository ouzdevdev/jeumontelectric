/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Opérations liées aux rôles
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Récupérer tous les rôles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Succès - Renvoie tous les rôles
 *       500:
 *         description: Erreur serveur - Impossible de récupérer tous les rôles
 */

/**
 * @swagger
 * /roles:
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
 *               // Définissez ici les propriétés attendues dans la requête POST pour créer un nouveau rôle
 *             example:
 *               // Exemple de corps de requête JSON pour créer un nouveau rôle
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
 * /roles/:id:
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
 *         example: 123
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
 * /roles/:id:
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
 *         example: 123
 *     responses:
 *       200:
 *         description: Succès - Le rôle a été supprimé avec succès
 *       404:
 *         description: Introuvable - Aucun rôle trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de supprimer le rôle
 */

// role.route.js
const express = require('express');
const router = express.Router();
const { roleController } = require('../controllers');

// const veryJWT = require('../middlewares/verifyJWT');

// Handles GET and POST requests for '/roles' route
router.route('/')
    .get(roleController.getAllRoles)     // Get all roles
    .post(roleController.createNewRole); // Create a new role

// Handles GET and DELETE requests for '/roles/:id' route
router.route('/:id')
    .get(roleController.getRoleById)    // Get a specific role by ID
    .delete(roleController.deleteRole); // Delete a role by ID

module.exports = router;