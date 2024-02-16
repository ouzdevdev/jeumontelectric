/**
 * @swagger
 * tags:
 *   name: Levels
 *   description: Opérations liées aux niveaux (levels)
 */

/**
 * @swagger
 * /levels:
 *   get:
 *     summary: Récupérer tous les niveaux (levels)
 *     tags: [Levels]
 *     responses:
 *       200:
 *         description: Succès - Renvoie tous les niveaux (levels)
 *       500:
 *         description: Erreur serveur - Impossible de récupérer tous les niveaux (levels)
 */

/**
 * @swagger
 * /levels:
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
 *               // Définissez ici les propriétés attendues dans la requête POST pour créer un nouveau niveau (level)
 *             example:
 *               // Exemple de corps de requête JSON pour créer un nouveau niveau (level)
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
 * /levels/:id:
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
 *         example: 123
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
 * /levels/:id:
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
 *         example: 123
 *     responses:
 *       200:
 *         description: Succès - Le niveau (level) a été supprimé avec succès
 *       404:
 *         description: Introuvable - Aucun niveau (level) trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de supprimer le niveau (level) par ID
 */


// level.route.js
const express = require('express');
const router = express.Router();
const { levelController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

// Handles GET and POST requests for '/levels' route
router.route('/')
    .get(veryJWT ,levelController.getAllLevels)     // Get all levels
    .post(veryJWT ,levelController.createNewLevel); // Create a new level

// Handles GET and DELETE requests for '/levels/:id' route
router.route('/:id')
    .get(veryJWT ,levelController.getLevelById)    // Get a specific level by ID
    .delete(veryJWT ,levelController.deleteLevel); // Delete a level by ID

module.exports = router;
