/**
 * @swagger
 * tags:
 *   name: Statuses
 *   description: Opérations liées aux statuts
 */

/**
 * @swagger
 * /statuses:
 *   get:
 *     summary: Récupérer tous les statuts
 *     tags: [Statuses]
 *     responses:
 *       200:
 *         description: Succès - Renvoie tous les statuts
 *       500:
 *         description: Erreur serveur - Impossible de récupérer tous les statuts
 */

/**
 * @swagger
 * /statuses:
 *   post:
 *     summary: Créer un nouveau statut
 *     tags: [Statuses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Définissez ici les propriétés attendues dans la requête POST pour créer un nouveau statut
 *             example:
 *               // Exemple de corps de requête JSON pour créer un nouveau statut
 *     responses:
 *       201:
 *         description: Succès - Le statut a été créé avec succès
 *       400:
 *         description: Requête incorrecte - Assurez-vous que le corps de la requête est correctement formaté
 *       500:
 *         description: Erreur serveur - Impossible de créer le statut
 */

/**
 * @swagger
 * /statuses/:id:
 *   get:
 *     summary: Récupérer un statut par ID
 *     tags: [Statuses]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du statut à récupérer
 *         schema:
 *           type: integer
 *         example: 123
 *     responses:
 *       200:
 *         description: Succès - Renvoie le statut spécifié par ID
 *       404:
 *         description: Introuvable - Aucun statut trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de récupérer le statut par ID
 */

/**
 * @swagger
 * /statuses/:id:
 *   delete:
 *     summary: Supprimer un statut par ID
 *     tags: [Statuses]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du statut à supprimer
 *         schema:
 *           type: integer
 *         example: 123
 *     responses:
 *       200:
 *         description: Succès - Le statut a été supprimé avec succès
 *       404:
 *         description: Introuvable - Aucun statut trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de supprimer le statut
 */

// status.route.js
const express = require('express');
const router = express.Router();
const { statusController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

// Handles GET and POST requests for '/statuses' route
router.route('/')
    .get(veryJWT ,statusController.getAllStatuses)    // Get all statuses
    .post(veryJWT ,statusController.createNewStatus); // Create a new status

// Handles GET and DELETE requests for '/statuses/:id' route
router.route('/:id')
    .get(veryJWT ,statusController.getStatusById)    // Get a specific status by ID
    .delete(veryJWT ,statusController.deleteStatus); // Delete a status by ID

module.exports = router;
