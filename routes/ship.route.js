/**
 * @swagger
 * tags:
 *   name: Ships
 *   description: Opérations liées aux vaisseaux (ships)
 */

/**
 * @swagger
 * /ships:
 *   get:
 *     summary: Récupérer tous les vaisseaux (ships)
 *     tags: [Ships]
 *     responses:
 *       200:
 *         description: Succès - Renvoie tous les vaisseaux (ships)
 *       500:
 *         description: Erreur serveur - Impossible de récupérer tous les vaisseaux (ships)
 */

/**
 * @swagger
 * /ships:
 *   post:
 *     summary: Créer un nouveau vaisseau (ship)
 *     tags: [Ships]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Définissez ici les propriétés attendues dans la requête POST pour créer un nouveau vaisseau (ship)
 *             example:
 *               // Exemple de corps de requête JSON pour créer un nouveau vaisseau (ship)
 *     responses:
 *       201:
 *         description: Succès - Le vaisseau (ship) a été créé avec succès
 *       400:
 *         description: Requête incorrecte - Assurez-vous que le corps de la requête est correctement formaté
 *       500:
 *         description: Erreur serveur - Impossible de créer le vaisseau (ship)
 */

/**
 * @swagger
 * /ships/:id:
 *   get:
 *     summary: Récupérer un vaisseau (ship) par ID
 *     tags: [Ships]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du vaisseau (ship) à récupérer
 *         schema:
 *           type: integer
 *         example: 123
 *     responses:
 *       200:
 *         description: Succès - Renvoie le vaisseau (ship) spécifié par ID
 *       404:
 *         description: Introuvable - Aucun vaisseau (ship) trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de récupérer le vaisseau (ship) par ID
 */

/**
 * @swagger
 * /ships/:id:
 *   put:
 *     summary: Mettre à jour un vaisseau (ship) par ID
 *     tags: [Ships]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du vaisseau (ship) à mettre à jour
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
 *               // Définissez ici les propriétés attendues dans la requête PUT pour mettre à jour un vaisseau (ship)
 *             example:
 *               // Exemple de corps de requête JSON pour mettre à jour un vaisseau (ship)
 *     responses:
 *       200:
 *         description: Succès - Le vaisseau (ship) a été mis à jour avec succès
 *       404:
 *         description: Introuvable - Aucun vaisseau (ship) trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de mettre à jour le vaisseau (ship)
 */

/**
 * @swagger
 * /ships/:id:
 *   delete:
 *     summary: Supprimer un vaisseau (ship) par ID
 *     tags: [Ships]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du vaisseau (ship) à supprimer
 *         schema:
 *           type: integer
 *         example: 123
 *     responses:
 *       200:
 *         description: Succès - Le vaisseau (ship) a été supprimé avec succès
 *       404:
 *         description: Introuvable - Aucun vaisseau (ship) trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de supprimer le vaisseau (ship)
 */

/**
 * @swagger
 * /ships/fleet/:fleet_id:
 *   get:
 *     summary: Récupérer tous les vaisseaux (ships) appartenant à une flotte spécifique
 *     tags: [Ships]
 *     parameters:
 *       - name: fleet_id
 *         in: path
 *         required: true
 *         description: ID de la flotte dont les vaisseaux doivent être récupérés
 *         schema:
 *           type: integer
 *         example: 456
 *     responses:
 *       200:
 *         description: Succès - Renvoie tous les vaisseaux (ships) appartenant à la flotte spécifiée par ID
 *       404:
 *         description: Introuvable - Aucune flotte trouvée pour l'ID spécifié ou aucun vaisseau (ship) trouvé pour la flotte spécifiée
 *       500:
 *         description: Erreur serveur - Impossible de récupérer les vaisseaux (ships) de la flotte spécifiée
 */

// ship.route.js
const express = require('express');
const router = express.Router();
const { shipController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

// Handles GET and POST requests for '/ships' route
router.route('/')
    .get(veryJWT ,shipController.getAllShips)     // Get all ships
    .post(veryJWT ,shipController.createNewShip); // Create a new ship

// Handles GET, PUT and DELETE requests for '/ships/:id' route
router.route('/:id')
    .get(veryJWT ,shipController.getShipById)    // Get a specific ship by ID
    .put(veryJWT ,shipController.updateShip)     // Update ship by ID
    .delete(veryJWT ,shipController.deleteShip); // Delete a ship by ID

// Handles GET request for '/ships/fleet/:id' route
router.route('/fleet/:fleet_id')
    .get(veryJWT ,shipController.getAllShipsByFleet); // Get a specific ship by ID

module.exports = router;
