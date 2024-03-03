/**
 * @swagger
 * tags:
 *   name: Sides
 *   description: Opérations liées aux côtés (sides)
 */

/**
 * @swagger
 * /api/v1/sides:
 *   get:
 *     summary: Récupérer tous les côtés (sides)
 *     tags: [Sides]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Renvoie tous les côtés (sides)
 *       500:
 *         description: Erreur serveur - Impossible de récupérer tous les côtés (sides)
 */

/**
 * @swagger
 * /api/v1/sides:
 *   post:
 *     summary: Créer un nouveau côté (side)
 *     tags: [Sides]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               side_label:
 *                 type: string
 *             example:
 *               side_label: "Side label"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Succès - Le côté (side) a été créé avec succès
 *       400:
 *         description: Requête incorrecte - Assurez-vous que le corps de la requête est correctement formaté
 *       500:
 *         description: Erreur serveur - Impossible de créer le côté (side)
 */


/**
 * @swagger
 * /api/v1/sides/{id}:
 *   get:
 *     summary: Récupérer un côté (side) par ID
 *     tags: [Sides]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du côté (side) à récupérer
 *         schema:
 *           type: integer
 *         example: 1
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Renvoie le côté (side) spécifié par ID
 *       404:
 *         description: Introuvable - Aucun côté (side) trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de récupérer le côté (side) par ID
 */

/**
 * @swagger
 * /api/v1/sides/{id}:
 *   delete:
 *     summary: Supprimer un côté (side) par ID
 *     tags: [Sides]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du côté (side) à supprimer
 *         schema:
 *           type: integer
 *         example: 1
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Le côté (side) a été supprimé avec succès
 *       404:
 *         description: Introuvable - Aucun côté (side) trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de supprimer le côté (side)
 */

const express = require('express');
const router = express.Router();
const { sideController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

/**
* Route : /api/v1/side
* Méthode : GET
* Description : Récupérer tous les côtés
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Liste de tous les côtés
*/
router.route('/')
    .get(veryJWT, sideController.getAllSides)

/**
* Route : /api/v1/side
* Méthode : POST
* Description : Créer un nouveau côté
* Authentification requise : Oui
* Permissions requises : N/A
* @body {Object} sideData - Les données du côté à créer
* @returns {Object} - Le côté créé
*/
    .post(veryJWT, sideController.createNewSide);
    
/**
* Route : /api/v1/side/:id
* Méthode : GET
* Description : Récupérer un côté par ID
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant du côté à récupérer
* @returns {Object} - Le côté correspondant à l'ID spécifié
*/
router.route('/:id')
    .get(veryJWT, sideController.getSideById)    

/**
* Route : /api/v1/side/:id
* Méthode : DELETE
* Description : Supprimer un côté par ID
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant du côté à supprimer
* @returns {Object} - Confirmation de la suppression du côté
*/
    .delete(veryJWT, sideController.deleteSide); 
    
module.exports = router;
