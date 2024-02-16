/**
 * @swagger
 * tags:
 *   name: Effects
 *   description: Opérations liées aux effets (effects)
 */

/**
 * @swagger
 * /effects:
 *   get:
 *     summary: Récupérer tous les effets (effects)
 *     tags: [Effects]
 *     responses:
 *       200:
 *         description: Succès - Renvoie tous les effets (effects)
 *       500:
 *         description: Erreur serveur - Impossible de récupérer tous les effets (effects)
 */

/**
 * @swagger
 * /effects:
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
 *               // Définissez ici les propriétés attendues dans la requête POST pour créer un nouvel effet (effect)
 *             example:
 *               // Exemple de corps de requête JSON pour créer un nouvel effet (effect)
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
 * /effects/:id:
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
 *         example: 123
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
 * /effects/:id:
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
 *         example: 123
 *     responses:
 *       200:
 *         description: Succès - L'effet (effect) a été supprimé avec succès
 *       404:
 *         description: Introuvable - Aucun effet (effect) trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de supprimer l'effet (effect) par ID
 */

// effect.route.js
const express = require('express');
const router = express.Router();
const { effectController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

// Handles GET and POST requests for '/effects' route
router.route('/')
  .get(veryJWT ,effectController.getAllEffects)    // Get all effects
  .post(veryJWT ,effectController.createNewEffect); // Create a new effect

// Handles GET and DELETE requests for '/effects/:id' route
router.route('/:id')
  .get(veryJWT ,effectController.getEffectById)    // Get a specific effect by ID
  .delete(veryJWT ,effectController.deleteEffect); // Delete an effect by ID

module.exports = router;
