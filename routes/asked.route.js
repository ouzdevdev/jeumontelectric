/**
 * @swagger
 * tags:
 *   name: Asked
 *   description: Les opérations liées aux éléments demandés (asked items).
 */

/**
 * @swagger
 * /asked:
 *   get:
 *     summary: Récupérer tous les éléments demandés
 *     tags: [Asked]
 *     responses:
 *       200:
 *         description: Succès - Renvoie tous les éléments demandés
 *       500:
 *         description: Erreur serveur - Impossible de récupérer les éléments demandés
 */

/**
 * @swagger
 * /asked:
 *   post:
 *     summary: Créer un nouvel élément demandé
 *     tags: [Asked]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Définissez ici les propriétés attendues dans la requête POST
 *             example:
 *               // Exemple de corps de requête JSON
 *     responses:
 *       201:
 *         description: Succès - L'élément demandé a été créé avec succès
 *       400:
 *         description: Requête incorrecte - Assurez-vous que le corps de la requête est correctement formaté
 *       500:
 *         description: Erreur serveur - Impossible de créer l'élément demandé
 */

/**
 * @swagger
 * /asked/:id:
 *   get:
 *     summary: Récupérer un élément demandé par ID
 *     tags: [Asked]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de l'élément demandé à récupérer
 *         schema:
 *           type: integer
 *         example: 123
 *     responses:
 *       200:
 *         description: Succès - Renvoie l'élément demandé spécifié par ID
 *       404:
 *         description: Introuvable - Aucun élément demandé trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de récupérer l'élément demandé par ID
 */

/**
 * @swagger
 * /asked/:id:
 *   delete:
 *     summary: Supprimer un élément demandé par ID
 *     tags: [Asked]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de l'élément demandé à supprimer
 *         schema:
 *           type: integer
 *         example: 123
 *     responses:
 *       200:
 *         description: Succès - L'élément demandé a été supprimé avec succès
 *       404:
 *         description: Introuvable - Aucun élément demandé trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de supprimer l'élément demandé par ID
 */

/**
 * @swagger
 * /asked/delete:
 *   delete:
 *     summary: Supprimer tous les éléments demandés
 *     tags: [Asked]
 *     responses:
 *       200:
 *         description: Succès - Tous les éléments demandés ont été supprimés avec succès
 *       500:
 *         description: Erreur serveur - Impossible de supprimer tous les éléments demandés
 */

const express = require('express');
const router = express.Router();
const { askedController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

// Handles GET and POST requests for '/asked' route
router.route('/')
  .get(veryJWT, askedController.getAllAsked)           // Get all asked items
  .post(veryJWT, askedController.createAsked);

// Handles GET, PUT and DELETE requests for '/asked/:id' route
router.route('/:id')
  .get(veryJWT, askedController.getAskedById)          // Get a specific asked item by ID
  .delete(veryJWT, askedController.deleteAsked);       // Delete an asked item by ID

router.route('/delete')
  .delete(veryJWT, askedController.deleteAll);       // Delete an asked item by ID

module.exports = router;
