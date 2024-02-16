/**
 * @swagger
 * tags:
 *   name: Customer Projects
 *   description: Opérations liées aux projets clients (customer projects)
 */

/**
 * @swagger
 * /customerProjects:
 *   get:
 *     summary: Récupérer tous les projets clients (customer projects)
 *     tags: [Customer Projects]
 *     responses:
 *       200:
 *         description: Succès - Renvoie tous les projets clients (customer projects)
 *       500:
 *         description: Erreur serveur - Impossible de récupérer tous les projets clients (customer projects)
 */

/**
 * @swagger
 * /customerProjects:
 *   post:
 *     summary: Créer un nouveau projet client (customer project)
 *     tags: [Customer Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Définissez ici les propriétés attendues dans la requête POST pour créer un nouveau projet client (customer project)
 *             example:
 *               // Exemple de corps de requête JSON pour créer un nouveau projet client (customer project)
 *     responses:
 *       201:
 *         description: Succès - Le projet client (customer project) a été créé avec succès
 *       400:
 *         description: Requête incorrecte - Assurez-vous que le corps de la requête est correctement formaté
 *       500:
 *         description: Erreur serveur - Impossible de créer le projet client (customer project)
 */

/**
 * @swagger
 * /customerProjects/:idProjet/:idShip:
 *   get:
 *     summary: Récupérer un projet client (customer project) par ID de projet et ID de vaisseau
 *     tags: [Customer Projects]
 *     parameters:
 *       - name: idProjet
 *         in: path
 *         required: true
 *         description: ID du projet à récupérer
 *         schema:
 *           type: integer
 *         example: 123
 *       - name: idShip
 *         in: path
 *         required: true
 *         description: ID du vaisseau associé au projet à récupérer
 *         schema:
 *           type: integer
 *         example: 456
 *     responses:
 *       200:
 *         description: Succès - Renvoie le projet client (customer project) spécifié par ID de projet et ID de vaisseau
 *       404:
 *         description: Introuvable - Aucun projet client (customer project) trouvé pour les ID de projet et de vaisseau spécifiés
 *       500:
 *         description: Erreur serveur - Impossible de récupérer le projet client (customer project) par ID de projet et ID de vaisseau
 */

/**
 * @swagger
 * /customerProjects/:idProjet/:idShip:
 *   delete:
 *     summary: Supprimer un projet client (customer project) par ID de projet et ID de vaisseau
 *     tags: [Customer Projects]
 *     parameters:
 *       - name: idProjet
 *         in: path
 *         required: true
 *         description: ID du projet à supprimer
 *         schema:
 *           type: integer
 *         example: 123
 *       - name: idShip
 *         in: path
 *         required: true
 *         description: ID du vaisseau associé au projet à supprimer
 *         schema:
 *           type: integer
 *         example: 456
 *     responses:
 *       200:
 *         description: Succès - Le projet client (customer project) a été supprimé avec succès
 *       404:
 *         description: Introuvable - Aucun projet client (customer project) trouvé pour les ID de projet et de vaisseau spécifiés
 *       500:
 *         description: Erreur serveur - Impossible de supprimer le projet client (customer project) par ID de projet et ID de vaisseau
 */

// customerProject.route.js
const express = require('express');
const router = express.Router();
const { customerProjectController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

// Handles GET and POST requests for '/customerProjects' route
router.route('/')
  .get(veryJWT ,customerProjectController.getAllCustomers)    // Get all customer projects
  .post(veryJWT ,customerProjectController.createNewCustomer); // Create a new customer project

// Handles GET and DELETE requests for '/customerProjects/:idProjet/:idShip' route
router.route('/:idProjet/:idShip')
  .get(veryJWT ,customerProjectController.getCustomerById)    // Get a specific customer project by project ID and ship ID
  .delete(veryJWT ,customerProjectController.deleteCustomer); // Delete a customer project by project ID and ship ID

module.exports = router;
