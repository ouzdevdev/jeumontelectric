/**
 * @swagger
 * tags:
 *   name: Tags
 *   description: Opérations liées aux tags
 */

/**
 * @swagger
 * /tags:
 *   get:
 *     summary: Récupérer tous les tags
 *     tags: [Tags]
 *     responses:
 *       200:
 *         description: Succès - Renvoie tous les tags
 *       500:
 *         description: Erreur serveur - Impossible de récupérer tous les tags
 */

/**
 * @swagger
 * /tags:
 *   post:
 *     summary: Créer un nouveau tag
 *     tags: [Tags]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Définissez ici les propriétés attendues dans la requête POST pour créer un nouveau tag
 *             example:
 *               // Exemple de corps de requête JSON pour créer un nouveau tag
 *     responses:
 *       201:
 *         description: Succès - Le tag a été créé avec succès
 *       400:
 *         description: Requête incorrecte - Assurez-vous que le corps de la requête est correctement formaté
 *       500:
 *         description: Erreur serveur - Impossible de créer le tag
 */

/**
 * @swagger
 * /tags/:id:
 *   get:
 *     summary: Récupérer un tag par ID
 *     tags: [Tags]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du tag à récupérer
 *         schema:
 *           type: integer
 *         example: 123
 *     responses:
 *       200:
 *         description: Succès - Renvoie le tag spécifié par ID
 *       404:
 *         description: Introuvable - Aucun tag trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de récupérer le tag par ID
 */

/**
 * @swagger
 * /tags/:id:
 *   put:
 *     summary: Mettre à jour un tag par ID
 *     tags: [Tags]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du tag à mettre à jour
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
 *               // Définissez ici les propriétés attendues dans la requête PUT pour mettre à jour un tag
 *             example:
 *               // Exemple de corps de requête JSON pour mettre à jour un tag
 *     responses:
 *       200:
 *         description: Succès - Le tag a été mis à jour avec succès
 *       404:
 *         description: Introuvable - Aucun tag trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de mettre à jour le tag
 */

/**
 * @swagger
 * /tags/:id:
 *   delete:
 *     summary: Supprimer un tag par ID
 *     tags: [Tags]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du tag à supprimer
 *         schema:
 *           type: integer
 *         example: 123
 *     responses:
 *       200:
 *         description: Succès - Le tag a été supprimé avec succès
 *       404:
 *         description: Introuvable - Aucun tag trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de supprimer le tag
 */

// tag.route.js
const express = require('express');
const router = express.Router();
const { tagController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

// Handles GET and POST requests for '/tags' route
router.route('/')
  .get(veryJWT ,tagController.getAllTags)    // Get all tags
  .post(veryJWT ,tagController.createNewTag); // Create a new tag

// Handles GET and DELETE requests for '/tags/:id' route
router.route('/:id')
  .get(veryJWT ,tagController.getTagById)    // Get a specific tag by ID
  .put(veryJWT ,tagController.updateTag)     // Update tag by ID
  .delete(veryJWT ,tagController.deleteTag); // Delete a tag by ID

module.exports = router;
