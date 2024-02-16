/**
 * @swagger
 * tags:
 *   name: PRFM
 *   description: Opérations liées aux PRFM items (à remplacer par le nom approprié)
 */

/**
 * @swagger
 * /api/prfm:
 *   get:
 *     summary: Récupérer tous les PRFM items
 *     tags: [PRFM]
 *     responses:
 *       200:
 *         description: Succès - Renvoie tous les PRFM items
 *       500:
 *         description: Erreur serveur - Impossible de récupérer tous les PRFM items
 */

/**
 * @swagger
 * /api/prfm:
 *   post:
 *     summary: Créer un nouveau PRFM item
 *     tags: [PRFM]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Définissez ici les propriétés attendues dans la requête POST pour créer un nouveau PRFM item
 *             example:
 *               // Exemple de corps de requête JSON pour créer un nouveau PRFM item
 *     responses:
 *       201:
 *         description: Succès - Le PRFM item a été créé avec succès
 *       400:
 *         description: Requête incorrecte - Assurez-vous que le corps de la requête est correctement formaté
 *       500:
 *         description: Erreur serveur - Impossible de créer le PRFM item
 */

/**
 * @swagger
 * /api/prfm/:id:
 *   get:
 *     summary: Récupérer un PRFM item par ID
 *     tags: [PRFM]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du PRFM item à récupérer
 *         schema:
 *           type: integer
 *         example: 123
 *     responses:
 *       200:
 *         description: Succès - Renvoie le PRFM item spécifié par ID
 *       404:
 *         description: Introuvable - Aucun PRFM item trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de récupérer le PRFM item par ID
 */

/**
 * @swagger
 * /api/prfm/:id:
 *   put:
 *     summary: Mettre à jour un PRFM item par ID
 *     tags: [PRFM]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du PRFM item à mettre à jour
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
 *               // Définissez ici les propriétés attendues dans la requête PUT pour mettre à jour un PRFM item
 *             example:
 *               // Exemple de corps de requête JSON pour mettre à jour un PRFM item
 *     responses:
 *       200:
 *         description: Succès - Le PRFM item a été mis à jour avec succès
 *       404:
 *         description: Introuvable - Aucun PRFM item trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de mettre à jour le PRFM item
 */

/**
 * @swagger
 * /api/prfm/:id:
 *   delete:
 *     summary: Supprimer un PRFM item par ID
 *     tags: [PRFM]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du PRFM item à supprimer
 *         schema:
 *           type: integer
 *         example: 123
 *     responses:
 *       200:
 *         description: Succès - Le PRFM item a été supprimé avec succès
 *       404:
 *         description: Introuvable - Aucun PRFM item trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de supprimer le PRFM item
 */

const express = require('express');
const router = express.Router();
const { prfmController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

// Handles GET requests for '/api/prfm' route
router.route('/') 
    .get(veryJWT ,prfmController.getAllPRFM)          // Get all PRFM items
    .post(veryJWT ,prfmController.createPRFM);        // Create a new PRFM item

// Handles GET, POST, PUT, and DELETE requests for '/api/prfm/:id' route
router.route('/:id')
  .get(veryJWT ,prfmController.getPRFMById)           // Get a specific PRFM item by ID

  .put(veryJWT ,prfmController.updatePRFM)            // Update a PRFM item by ID
  .delete(veryJWT ,prfmController.deletePRFM);        // Delete a PRFM item by ID

module.exports = router;
