/**
 * @swagger
 * tags:
 *   name: Fleets
 *   description: Opérations liées aux flottes (fleets)
 */

/**
 * @swagger
 * /fleets:
 *   get:
 *     summary: Récupérer toutes les flottes (fleets)
 *     tags: [Fleets]
 *     responses:
 *       200:
 *         description: Succès - Renvoie toutes les flottes (fleets)
 *       500:
 *         description: Erreur serveur - Impossible de récupérer toutes les flottes (fleets)
 */

/**
 * @swagger
 * /fleets:
 *   post:
 *     summary: Créer une nouvelle flotte (fleet)
 *     tags: [Fleets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Définissez ici les propriétés attendues dans la requête POST pour créer une nouvelle flotte (fleet)
 *             example:
 *               // Exemple de corps de requête JSON pour créer une nouvelle flotte (fleet)
 *     responses:
 *       201:
 *         description: Succès - La flotte (fleet) a été créée avec succès
 *       400:
 *         description: Requête incorrecte - Assurez-vous que le corps de la requête est correctement formaté
 *       500:
 *         description: Erreur serveur - Impossible de créer la flotte (fleet)
 */

/**
 * @swagger
 * /fleets/:id:
 *   get:
 *     summary: Récupérer une flotte (fleet) par ID
 *     tags: [Fleets]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la flotte à récupérer
 *         schema:
 *           type: integer
 *         example: 123
 *     responses:
 *       200:
 *         description: Succès - Renvoie la flotte (fleet) spécifiée par ID
 *       404:
 *         description: Introuvable - Aucune flotte (fleet) trouvée pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de récupérer la flotte (fleet) par ID
 */

/**
 * @swagger
 * /fleets/:id:
 *   put:
 *     summary: Mettre à jour une flotte (fleet) par ID
 *     tags: [Fleets]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la flotte à mettre à jour
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
 *               // Définissez ici les propriétés attendues dans la requête PUT pour mettre à jour une flotte (fleet)
 *             example:
 *               // Exemple de corps de requête JSON pour mettre à jour une flotte (fleet)
 *     responses:
 *       200:
 *         description: Succès - La flotte (fleet) a été mise à jour avec succès
 *       400:
 *         description: Requête incorrecte - Assurez-vous que le corps de la requête est correctement formaté
 *       404:
 *         description: Introuvable - Aucune flotte (fleet) trouvée pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de mettre à jour la flotte (fleet) par ID
 */

/**
 * @swagger
 * /fleets/:id:
 *   delete:
 *     summary: Supprimer une flotte (fleet) par ID
 *     tags: [Fleets]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la flotte à supprimer
 *         schema:
 *           type: integer
 *         example: 123
 *     responses:
 *       200:
 *         description: Succès - La flotte (fleet) a été supprimée avec succès
 *       404:
 *         description: Introuvable - Aucune flotte (fleet) trouvée pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de supprimer la flotte (fleet) par ID
 */

/**
 * @swagger
 * /fleets/customer/:cust_uuid:
 *   get:
 *     summary: Récupérer toutes les flottes (fleets) par UUID de client
 *     tags: [Fleets]
 *     parameters:
 *       - name: cust_uuid
 *         in: path
 *         required: true
 *         description: UUID du client pour lequel récupérer les flottes
 *         schema:
 *           type: string
 *         example: abc123
 *     responses:
 *       200:
 *         description: Succès - Renvoie toutes les flottes (fleets) associées au client spécifié par UUID
 *       404:
 *         description: Introuvable - Aucune flotte (fleet) trouvée pour l'UUID de client spécifié
 *       500:
 *         description: Erreur serveur - Impossible de récupérer les flottes (fleets) par UUID de client
 */

// fleet.route.js
const express = require('express');
const router = express.Router();
const { fleetController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

// Handles GET and POST requests for '/fleets' route
router.route('/')
  .get(veryJWT ,fleetController.getAllFleets)     // Get all fleets
  .post(veryJWT ,fleetController.createNewFleet); // Create a new fleet

// Handles GET, PUT and DELETE requests for '/fleets/:id' route
router.route('/:id')
  .get(veryJWT ,fleetController.getFleetById)    // Get a specific fleet by ID
  .put(veryJWT ,fleetController.updateFleet)     // Upadte fleet by ID
  .delete(veryJWT ,fleetController.deleteFleet); // Delete a fleet by ID

// Handles GET requests for '/fleets/:cust_uuid' route
router.route('/customer/:cust_uuid')
  .get(veryJWT ,fleetController.getAllFleetsByCustomer); // Get all fleets by customer

module.exports = router;
