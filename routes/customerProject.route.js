/**
 * @swagger
 * tags:
 *   name: Customer Projects
 *   description: Opérations liées aux projets clients (customer projects)
 */

/**
 * @swagger
 * /api/v1/customerProjects:
 *   get:
 *     summary: Récupérer tous les projets clients (customer projects)
 *     tags: [Customer Projects]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Renvoie tous les projets clients (customer projects)
 *       500:
 *         description: Erreur serveur - Impossible de récupérer tous les projets clients (customer projects)
 */

/**
 * @swagger
 * /api/v1/customerProjects:
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
 *               project_uuid:
 *                 type: string
 *                 format: uuid
 *               ship_uuid:
 *                 type: string
 *                 format: uuid
 *             example:
 *               project_uuid: "xxxxxxxx-xxx-xxx-xxxx-xxxxxxxxxx"
 *               ship_uuid: "xxxxxxxx-xxx-xxx-xxxx-xxxxxxxxxx"
 *     security:
 *       - BearerAuth: []
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
 * /api/v1/customerProjects/{idProjet}/{idShip}:
 *   get:
 *     summary: Récupérer un projet client (customer project) par ID de projet et ID de vaisseau
 *     tags: [Customer Projects]
 *     parameters:
 *       - name: idProjet
 *         in: path
 *         required: true
 *         description: ID du projet à récupérer
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "xxxxxxxx-xxx-xxx-xxxx-xxxxxxxxxx"
 *       - name: idShip
 *         in: path
 *         required: true
 *         description: ID du vaisseau associé au projet à récupérer
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "xxxxxxxx-xxx-xxx-xxxx-xxxxxxxxxx"
 *     security:
 *       - BearerAuth: []
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
 * /api/v1/customerProjects/{idProjet}/{idShip}:
 *   delete:
 *     summary: Supprimer un projet client (customer project) par ID de projet et ID de vaisseau
 *     tags: [Customer Projects]
 *     parameters:
 *       - name: idProjet
 *         in: path
 *         required: true
 *         description: ID du projet à récupérer
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "xxxxxxxx-xxx-xxx-xxxx-xxxxxxxxxx"
 *       - name: idShip
 *         in: path
 *         required: true
 *         description: ID du vaisseau associé au projet à récupérer
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "xxxxxxxx-xxx-xxx-xxxx-xxxxxxxxxx"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Le projet client (customer project) a été supprimé avec succès
 *       404:
 *         description: Introuvable - Aucun projet client (customer project) trouvé pour les ID de projet et de vaisseau spécifiés
 *       500:
 *         description: Erreur serveur - Impossible de supprimer le projet client (customer project) par ID de projet et ID de vaisseau
 */

const express = require('express');
const router = express.Router();
const { customerProjectController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

/**
* Route : /api/v1/customerProjects
* Méthode : GET
* Description : Récupérer tous les projets clients
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Liste de tous les projets clients
*/
router.route('/')
  .get(veryJWT, customerProjectController.getAllCustomers)    

/**
* Route : /api/v1/customerProjects
* Méthode : POST
* Description : Créer un nouveau projet client
* Authentification requise : Oui
* Permissions requises : N/A
* @body {Object} customerProjectData - Les données du projet client à créer
* @returns {Object} - Le projet client créé
*/
  .post(veryJWT, customerProjectController.createNewCustomer); 
  
/**
* Route : /api/v1/customerProjects/:idProjet/:idShip
* Méthode : GET
* Description : Récupérer un projet client par ID
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} idProjet - L'identifiant du projet
* @param {string} idShip - L'identifiant du navire associé au projet
* @returns {Object} - Le projet client spécifié par ID
*/
router.route('/:idProjet/:idShip')
  .get(veryJWT, customerProjectController.getCustomerById)    

/**
* Route : /api/v1/customerProjects/:idProjet/:idShip
* Méthode : DELETE
* Description : Supprimer un projet client par ID
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} idProjet - L'identifiant du projet
* @param {string} idShip - L'identifiant du navire associé au projet
* @returns {Object} - Confirmation de la suppression du projet client
*/
  .delete(veryJWT, customerProjectController.deleteCustomer); 
  
module.exports = router;

