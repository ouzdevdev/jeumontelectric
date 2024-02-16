/**
 * @swagger
 * tags:
 *   name: Effect Types
 *   description: Opérations liées aux types d'effets (effect types)
 */

/**
 * @swagger
 * /effectTypes:
 *   get:
 *     summary: Récupérer tous les types d'effets (effect types)
 *     tags: [Effect Types]
 *     responses:
 *       200:
 *         description: Succès - Renvoie tous les types d'effets (effect types)
 *       500:
 *         description: Erreur serveur - Impossible de récupérer tous les types d'effets (effect types)
 */

/**
 * @swagger
 * /effectTypes:
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
 *               // Définissez ici les propriétés attendues dans la requête POST pour créer un nouveau type d'effet (effect type)
 *             example:
 *               // Exemple de corps de requête JSON pour créer un nouveau type d'effet (effect type)
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
 * /effectTypes/:id:
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
 *         example: 123
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
 * /effectTypes/:id:
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
 *         example: 123
 *     responses:
 *       200:
 *         description: Succès - Le type d'effet (effect type) a été supprimé avec succès
 *       404:
 *         description: Introuvable - Aucun type d'effet (effect type) trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de supprimer le type d'effet (effect type) par ID
 */

// effectType.route.js
const express = require('express');
const router = express.Router();
const { effectTypeController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

// Handles GET and POST requests for '/effectTypes' route
router.route('/')
  .get(veryJWT ,effectTypeController.getAllEffects)    // Get all effect types
  .post(veryJWT ,effectTypeController.createNewEffect); // Create a new effect type

// Handles GET and DELETE requests for '/effectTypes/:id' route
router.route('/:id')
  .get(veryJWT ,effectTypeController.getEffectById)    // Get a specific effect type by ID
  .delete(veryJWT ,effectTypeController.deleteEffect); // Delete an effect type by ID

module.exports = router;
