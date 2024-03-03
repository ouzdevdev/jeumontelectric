/**
 * @swagger
 * tags:
 *   name: Status
 *   description: Opérations liées aux statuts
 */

/**
 * @swagger
 * /api/v1/status:
 *   get:
 *     summary: Récupérer tous les statuts
 *     tags: [Status]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Renvoie tous les statuts
 *       500:
 *         description: Erreur serveur - Impossible de récupérer tous les statuts
 */

/**
 * @swagger
 * /api/v1/status:
 *   post:
 *     summary: Créer un nouveau statut
 *     tags: [Status]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status_label:
 *                 type: string
 *               status_color:
 *                 type: string
 *             example:
 *               status_label: "Status label"
 *               status_color: "#000000"
 *     security:
 *       - BearerAuth: []
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
 * /api/v1/status/{id}:
 *   get:
 *     summary: Récupérer un statut par ID
 *     tags: [Status]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du statut à récupérer
 *         schema:
 *           type: integer
 *         example: 1
 *     security:
 *       - BearerAuth: []
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
 * /api/v1/status/{id}:
 *   delete:
 *     summary: Supprimer un statut par ID
 *     tags: [Status]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du statut à supprimer
 *         schema:
 *           type: integer
 *         example: 1
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Le statut a été supprimé avec succès
 *       404:
 *         description: Introuvable - Aucun statut trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de supprimer le statut
 */

const express = require('express');
const router = express.Router();
const { statusController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

/**
* Route : /api/v1/status
* Méthode : GET
* Description : Récupérer tous les statuts
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Liste de tous les statuts
*/
router.route('/')
    .get(veryJWT ,statusController.getAllStatuses)    

/**
* Route : /api/v1/status
* Méthode : POST
* Description : Créer un nouveau statut
* Authentification requise : Oui
* Permissions requises : N/A
* @body {Object} statusData - Les données du statut à créer
* @returns {Object} - Le statut créé
*/
    .post(veryJWT ,statusController.createNewStatus); 
    
/**
* Route : /api/v1/status/:id
* Méthode : GET
* Description : Récupérer un statut par ID
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant du statut à récupérer
* @returns {Object} - Le statut correspondant à l'ID spécifié
*/
router.route('/:id')
    .get(veryJWT ,statusController.getStatusById)    

/**
* Route : /api/v1/status/:id
* Méthode : DELETE
* Description : Supprimer un statut par ID
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant du statut à supprimer
* @returns {Object} - Confirmation de la suppression du statut
*/
    .delete(veryJWT ,statusController.deleteStatus); 
    
module.exports = router;
