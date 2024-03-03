/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Opérations liées aux clients
 */

/**
 * @swagger
 * /api/v1/customers:
 *   get:
 *     summary: Récupérer tous les clients
 *     tags: [Customers]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Renvoie tous les clients
 *       500:
 *         description: Erreur serveur - Impossible de récupérer tous les clients
 */

/**
 * @swagger
 * /api/v1/customers:
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
 *               customer_ref:
 *                 type: string
 *                 nullable: true
 *               customer_name:
 *                 type: string
 *               customer_description:
 *                 type: string
 *               customer_siret:
 *                 type: string
 *                 nullable: true
 *             example:
 *               customer_ref: null
 *               customer_name: "Customer name"
 *               customer_description: "Customer description ..."
 *               customer_siret: null
 *     security:
 *       - BearerAuth: []
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
 * /api/v1/customers/{id}:
 *   get:
 *     summary: Récupérer un client par ID
 *     tags: [Customers]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de client à supprimer
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "xxxxxxxx-xxx-xxx-xxxx-xxxxxxxxxx"
 *     security:
 *       - BearerAuth: []
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
 * /api/v1/customers/{id}:
 *   put:
 *     summary: Mettre à jour un client par ID
 *     tags: [Customers]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de client à modifier
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "xxxxxxxx-xxx-xxx-xxxx-xxxxxxxxxx"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_ref:
 *                 type: string
 *                 nullable: true
 *               customer_name:
 *                 type: string
 *               customer_description:
 *                 type: string
 *               customer_siret:
 *                 type: string
 *                 nullable: true
 *             example:
 *               customer_ref: null
 *               customer_name: "Customer name"
 *               customer_description: "Customer descriprion ..."
 *               customer_siret: null
 *     security:
 *       - BearerAuth: []
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
 * /api/v1/customers/{id}:
 *   delete:
 *     summary: Supprimer un client par ID
 *     tags: [Customers]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de client à supprimer
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "xxxxxxxx-xxx-xxx-xxxx-xxxxxxxxxx"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Le client a été supprimé avec succès
 *       404:
 *         description: Introuvable - Aucun client trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de supprimer le client
 */

const express = require('express');
const router = express.Router();
const { customerController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

/**
* Route : /api/v1/customers
* Méthode : GET
* Description : Récupérer tous les clients
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Liste de tous les clients
*/
router.route('/')
  .get(veryJWT, customerController.getAllCustomers) 

/**
* Route : /api/v1/customers
* Méthode : POST
* Description : Créer un nouveau client
* Authentification requise : Oui
* Permissions requises : N/A
* @body {Object} customerData - Les données du client à créer
* @returns {Object} - Le client créé
*/  
  .post(veryJWT, customerController.createNewCustomer); 
  
/**
* Route : /api/v1/customers/:id
* Méthode : GET
* Description : Récupérer un client par ID
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant du client à récupérer
* @returns {Object} - Le client spécifié par ID
*/
router.route('/:id')
  .get(veryJWT, customerController.getCustomerById)    

/**
* Route : /api/v1/customers/:id
* Méthode : PUT
* Description : Mettre à jour un client par ID
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant du client à mettre à jour
* @body {Object} customerData - Les données du client à mettre à jour
* @returns {Object} - Le client mis à jour
*/   
  .put(veryJWT, customerController.updateCustomer)     

/**
* Route : /api/v1/customers/:id
* Méthode : DELETE
* Description : Supprimer un client par ID
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant du client à supprimer
* @returns {Object} - Confirmation de la suppression du client
*/   
  .delete(veryJWT, customerController.deleteCustomer); 
  
module.exports = router;
