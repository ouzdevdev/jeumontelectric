/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Opérations liées aux clients
 */

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Récupérer tous les clients
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Succès - Renvoie tous les clients
 *       500:
 *         description: Erreur serveur - Impossible de récupérer tous les clients
 */

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Créer un nouveau client
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Définissez ici les propriétés attendues dans la requête POST pour créer un nouveau client
 *             example:
 *               // Exemple de corps de requête JSON pour créer un nouveau client
 *     responses:
 *       201:
 *         description: Succès - Le client a été créé avec succès
 *       400:
 *         description: Requête incorrecte - Assurez-vous que le corps de la requête est correctement formaté
 *       500:
 *         description: Erreur serveur - Impossible de créer le client
 */

/**
 * @swagger
 * /customers/:id:
 *   get:
 *     summary: Récupérer un client par ID
 *     tags: [Customers]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du client à récupérer
 *         schema:
 *           type: integer
 *         example: 123
 *     responses:
 *       200:
 *         description: Succès - Renvoie le client spécifié par ID
 *       404:
 *         description: Introuvable - Aucun client trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de récupérer le client par ID
 */

/**
 * @swagger
 * /customers/:id:
 *   put:
 *     summary: Mettre à jour un client par ID
 *     tags: [Customers]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du client à mettre à jour
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
 *               // Définissez ici les propriétés attendues dans la requête PUT pour mettre à jour un client
 *             example:
 *               // Exemple de corps de requête JSON pour mettre à jour un client
 *     responses:
 *       200:
 *         description: Succès - Le client a été mis à jour avec succès
 *       404:
 *         description: Introuvable - Aucun client trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de mettre à jour le client
 */

/**
 * @swagger
 * /customers/:id:
 *   delete:
 *     summary: Supprimer un client par ID
 *     tags: [Customers]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du client à supprimer
 *         schema:
 *           type: integer
 *         example: 123
 *     responses:
 *       200:
 *         description: Succès - Le client a été supprimé avec succès
 *       404:
 *         description: Introuvable - Aucun client trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de supprimer le client
 */

// customer.route.js
const express = require('express');
const router = express.Router();
const { customerController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

// Handles GET and POST requests for '/customers' route
router.route('/')
  .get(veryJWT, customerController.getAllCustomers)    // Get all customers
  .post(veryJWT, customerController.createNewCustomer); // Create a new customer

// Handles GET and DELETE requests for '/customers/:id' route
router.route('/:id')
  .get(veryJWT, customerController.getCustomerById)    // Get a specific customer by ID
  .put(veryJWT, customerController.updateCustomer)     // Update customer by ID
  .delete(veryJWT, customerController.deleteCustomer); // Delete a customer by ID

module.exports = router;
