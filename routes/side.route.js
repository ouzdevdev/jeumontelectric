/**
 * @swagger
 * tags:
 *   name: Sides
 *   description: Opérations liées aux côtés (sides)
 */

/**
 * @swagger
 * /sides:
 *   get:
 *     summary: Récupérer tous les côtés (sides)
 *     tags: [Sides]
 *     responses:
 *       200:
 *         description: Succès - Renvoie tous les côtés (sides)
 *       500:
 *         description: Erreur serveur - Impossible de récupérer tous les côtés (sides)
 */

/**
 * @swagger
 * /sides:
 *   post:
 *     summary: Créer un nouveau côté (side)
 *     tags: [Sides]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Définissez ici les propriétés attendues dans la requête POST pour créer un nouveau côté (side)
 *             example:
 *               // Exemple de corps de requête JSON pour créer un nouveau côté (side)
 *     responses:
 *       201:
 *         description: Succès - Le côté (side) a été créé avec succès
 *       400:
 *         description: Requête incorrecte - Assurez-vous que le corps de la requête est correctement formaté
 *       500:
 *         description: Erreur serveur - Impossible de créer le côté (side)
 */

/**
 * @swagger
 * /sides/:id:
 *   get:
 *     summary: Récupérer un côté (side) par ID
 *     tags: [Sides]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du côté (side) à récupérer
 *         schema:
 *           type: integer
 *         example: 123
 *     responses:
 *       200:
 *         description: Succès - Renvoie le côté (side) spécifié par ID
 *       404:
 *         description: Introuvable - Aucun côté (side) trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de récupérer le côté (side) par ID
 */

/**
 * @swagger
 * /sides/:id:
 *   delete:
 *     summary: Supprimer un côté (side) par ID
 *     tags: [Sides]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du côté (side) à supprimer
 *         schema:
 *           type: integer
 *         example: 123
 *     responses:
 *       200:
 *         description: Succès - Le côté (side) a été supprimé avec succès
 *       404:
 *         description: Introuvable - Aucun côté (side) trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de supprimer le côté (side)
 */

// side.route.js
const express = require('express');
const router = express.Router();
const { sideController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

// Handles GET and POST requests for '/sides' route
router.route('/')
    .get(veryJWT ,sideController.getAllSides)     // Get all sides
    .post(veryJWT ,sideController.createNewSide); // Create a new side

// Handles GET and DELETE requests for '/sides/:id' route
router.route('/:id')
    .get(veryJWT ,sideController.getSideById)    // Get a specific side by ID
    .delete(veryJWT ,sideController.deleteSide); // Delete a side by ID

module.exports = router;
