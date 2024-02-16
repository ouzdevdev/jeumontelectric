/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Opérations liées aux utilisateurs
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Définissez ici les propriétés attendues dans la requête POST pour créer un nouvel utilisateur
 *             example:
 *               // Exemple de corps de requête JSON pour créer un nouvel utilisateur
 *     responses:
 *       201:
 *         description: Succès - L'utilisateur a été créé avec succès
 *       400:
 *         description: Requête incorrecte - Assurez-vous que le corps de la requête est correctement formaté
 *       500:
 *         description: Erreur serveur - Impossible de créer l'utilisateur
 */

/**
 * @swagger
 * /users/:id:
 *   put:
 *     summary: Mettre à jour un utilisateur par ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de l'utilisateur à mettre à jour
 *         schema:
 *           type: integer
 *         example: 123
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Définissez ici les propriétés attendues dans la requête PUT pour mettre à jour un utilisateur
 *             example:
 *               // Exemple de corps de requête JSON pour mettre à jour un utilisateur
 *     responses:
 *       200:
 *         description: Succès - L'utilisateur a été mis à jour avec succès
 *       404:
 *         description: Introuvable - Aucun utilisateur trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de mettre à jour l'utilisateur
 */

/**
 * @swagger
 * /users/:id:
 *   get:
 *     summary: Récupérer un utilisateur par ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de l'utilisateur à récupérer
 *         schema:
 *           type: integer
 *         example: 123
 *     responses:
 *       200:
 *         description: Succès - Renvoie l'utilisateur spécifié par ID
 *       404:
 *         description: Introuvable - Aucun utilisateur trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de récupérer l'utilisateur par ID
 */

/**
 * @swagger
 * /users/:id:
 *   delete:
 *     summary: Supprimer un utilisateur par ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de l'utilisateur à supprimer
 *         schema:
 *           type: integer
 *         example: 123
 *     responses:
 *       200:
 *         description: Succès - L'utilisateur a été supprimé avec succès
 *       404:
 *         description: Introuvable - Aucun utilisateur trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de supprimer l'utilisateur
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Succès - Renvoie tous les utilisateurs
 *       500:
 *         description: Erreur serveur - Impossible de récupérer tous les utilisateurs
 */


// user.route.js
const express = require('express');
const router = express.Router();
const { userController } = require('../controllers');
// const { authorize } = require("../middlewares/authorization");

// const veryJWT = require('../middlewares/verifyJWT');

// Handles GET and POST requests for '/users' route
router.route('/')
  .get(userController.getAllUsers)    // Get all users
  .post(userController.createNewUser); // Create a new user

// Handles GET, DELETE and PUT requests for '/users/:id' route
router.route('/:id')
  .put(userController.updateUser)     // Update user
  .get(userController.getUserById)    // Get user by id
  .delete(userController.deleteUser); // Delete user

// example how use authorize
// router.route('/').get(authorize([2, 3]), userController.getAllUsers);

  
module.exports = router;
