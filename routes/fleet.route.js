/**
 * @swagger
 * tags:
 *   name: Fleets
 *   description: Opérations liées aux flottes (fleets)
 */

/**
 * @swagger
 * /api/v1/fleets:
 *   get:
 *     summary: Récupérer toutes les flottes (fleets)
 *     tags: [Fleets]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Renvoie toutes les flottes (fleets)
 *       500:
 *         description: Erreur serveur - Impossible de récupérer toutes les flottes (fleets)
 */

/**
 * @swagger
 * /api/v1/fleets:
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
 *               fleet_name:
 *                 type: string
 *               fleet_description:
 *                 type: string
 *               customer_uuid:
 *                 type: string
 *                 format: uuid
 *             example:
 *               fleet_name: "Fleet name"
 *               fleet_description: "Fleet description"
 *               customer_uuid: "xxxxx-xxxx-xxxx-xxxxx-xxxxxxx"
 *     security:
 *       - BearerAuth: []
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
 * /api/v1/fleets/{id}:
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
 *         example: 1
 *     security:
 *       - BearerAuth: []
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
 * /api/v1/fleets/{id}:
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
 *         example: 1
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fleet_name:
 *                 type: string
 *               fleet_description:
 *                 type: string
 *               customer_uuid:
 *                 type: string
 *                 format: uuid
 *             example:
 *               fleet_name: "Fleet name"
 *               fleet_description: "Fleet description"
 *               customer_uuid: "xxxxx-xxxx-xxxx-xxxxx-xxxxxxx"
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
 * /api/v1/fleets/{id}:
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
 *         example: 1
 *     security:
 *       - BearerAuth: []
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
 * /api/v1/fleets/customer/{cust_uuid}:
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
 *           format: uuid
 *         example: "xxxxx-xxxx-xxxx-xxxxx-xxxxxxx"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Renvoie toutes les flottes (fleets) associées au client spécifié par UUID
 *       404:
 *         description: Introuvable - Aucune flotte (fleet) trouvée pour l'UUID de client spécifié
 *       500:
 *         description: Erreur serveur - Impossible de récupérer les flottes (fleets) par UUID de client
 */

const express = require('express');
const router = express.Router();
const { fleetController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

/**
* Route : /api/v1/fleets
* Méthode : GET
* Description : Récupérer tous les flottes
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Liste de tous les flottes
*/
router.route('/')
  .get(veryJWT, fleetController.getAllFleets)     

/**
* Route : /api/v1/fleets
* Méthode : POST
* Description : Créer une nouvelle flotte
* Authentification requise : Oui
* Permissions requises : N/A
* @body {Object} fleetData - Les données de la flotte à créer
* @returns {Object} - La flotte créée
*/  
  .post(veryJWT, fleetController.createNewFleet); 
  
/**
* Route : /api/v1/fleets/:id
* Méthode : GET
* Description : Récupérer une flotte par ID
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant de la flotte à récupérer
* @returns {Object} - La flotte spécifiée par ID
*/
router.route('/:id')
  .get(veryJWT, fleetController.getFleetById)    

/**
* Route : /api/v1/fleets/:id
* Méthode : PUT
* Description : Mettre à jour une flotte par ID
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant de la flotte à mettre à jour
* @body {Object} fleetData - Les données de la flotte à mettre à jour
* @returns {Object} - La flotte mise à jour
*/   
  .put(veryJWT, fleetController.updateFleet)     

/**
* Route : /api/v1/fleets/:id
* Méthode : DELETE
* Description : Supprimer une flotte par ID
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant de la flotte à supprimer
* @returns {Object} - Confirmation de la suppression de la flotte
*/   
  .delete(veryJWT, fleetController.deleteFleet); 
  
/**
* Route : /api/v1/fleets/customer/:cust_uuid
* Méthode : GET
* Description : Récupérer toutes les flottes associées à un client spécifique
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} cust_uuid - L'identifiant du client pour lequel récupérer les flottes
* @returns {Object} - Liste de toutes les flottes associées au client spécifié
*/
router.route('/customer/:cust_uuid')
  .get(veryJWT, fleetController.getAllFleetsByCustomer);

module.exports = router;
