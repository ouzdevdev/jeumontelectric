/**
 * @swagger
 * tags:
 *   name: Ships
 *   description: Opérations liées aux vaisseaux (ships)
 */

/**
 * @swagger
 * /api/v1/ships:
 *   get:
 *     summary: Récupérer tous les vaisseaux (ships)
 *     tags: [Ships]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Renvoie tous les vaisseaux (ships)
 *       500:
 *         description: Erreur serveur - Impossible de récupérer tous les vaisseaux (ships)
 */

/**
 * @swagger
 * /api/v1/ships:
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
 *               ship_name:
 *                 type: string
 *               fleet_id:
 *                 type: integer
 *             example:
 *               ship_name: "Ship name"
 *               fleet_id: 1
 *     security:
 *       - BearerAuth: []
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
 * /api/v1/ships/{id}:
 *   get:
 *     summary: Récupérer un vaisseau (ship) par ID
 *     tags: [Ships]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du vaisseau (ship) à récupérer
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "xxxxx-xxxx-xxxx-xxxxx-xxxxxxx"
 *     security:
 *       - BearerAuth: []
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
 * /api/v1/ships/{id}:
 *   put:
 *     summary: Mettre à jour un vaisseau (ship) par ID
 *     tags: [Ships]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du vaisseau (ship) à mettre à jour
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "xxxxx-xxxx-xxxx-xxxxx-xxxxxxx"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ship_name:
 *                 type: string
 *               fleet_id:
 *                 type: integer
 *             example:
 *               ship_name: "Ship name"
 *               fleet_id: 1
 *     security:
 *       - BearerAuth: []
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
 * /api/v1/ships/{id}:
 *   delete:
 *     summary: Supprimer un vaisseau (ship) par ID
 *     tags: [Ships]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du vaisseau (ship) à supprimer
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "xxxxx-xxxx-xxxx-xxxxx-xxxxxxx"
 *     security:
 *       - BearerAuth: []
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
 * /api/v1/ships/fleet/{fleet_id}:
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
 *         example: 1
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Renvoie tous les vaisseaux (ships) appartenant à la flotte spécifiée par ID
 *       404:
 *         description: Introuvable - Aucune flotte trouvée pour l'ID spécifié ou aucun vaisseau (ship) trouvé pour la flotte spécifiée
 *       500:
 *         description: Erreur serveur - Impossible de récupérer les vaisseaux (ships) de la flotte spécifiée
 */

/**
 * @swagger
 * /api/v1/ships/customer/{cust_uuid}:
 *   get:
 *     summary: Récupérer tous les vaisseaux (ships) appartenant à une flotte spécifique
 *     tags: [Ships]
 *     parameters:
 *       - name: cust_uuid
 *         in: path
 *         required: true
 *         description: ID de client dont les vaisseaux doivent être récupérés
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "xxxxx-xxxx-xxxx-xxxxx-xxxxxxx"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Renvoie tous les bateaux (ships) appartenant à la flotte spécifiée par ID
 *       404:
 *         description: Introuvable - Aucune client trouvée pour l'ID spécifié ou aucun vaisseau (ship) trouvé pour la flotte spécifiée
 *       500:
 *         description: Erreur serveur - Impossible de récupérer les bateaux (ships) de la flotte spécifiée
 */

const express = require('express');
const router = express.Router();
const { shipController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

/**
* Route : /api/v1/ship
* Méthode : GET
* Description : Récupérer tous les navires
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Liste de tous les navires
*/
router.route('/')
    .get(veryJWT, shipController.getAllShips)

/**
* Route : /api/v1/ship
* Méthode : POST
* Description : Créer un nouveau navire
* Authentification requise : Oui
* Permissions requises : N/A
* @body {Object} shipData - Les données du navire à créer
* @returns {Object} - Le navire créé
*/
    .post(veryJWT, shipController.createNewShip); 
    
/**
* Route : /api/v1/ship/:id
* Méthode : GET
* Description : Récupérer un navire par ID
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant du navire à récupérer
* @returns {Object} - Le navire correspondant à l'ID spécifié
*/
router.route('/:id')
    .get(veryJWT, shipController.getShipById)    

/**
* Route : /api/v1/ship/:id
* Méthode : PUT
* Description : Mettre à jour un navire
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant du navire à mettre à jour
* @returns {Object} - Le navire mis à jour
*/
    .put(veryJWT, shipController.updateShip)     

/**
* Route : /api/v1/ship/:id
* Méthode : DELETE
* Description : Supprimer un navire
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant du navire à supprimer
* @returns {Object} - Confirmation de la suppression du navire
*/
    .delete(veryJWT, shipController.deleteShip); 
    
/**
* Route : /api/v1/ship/fleet/:fleet_id
* Méthode : GET
* Description : Récupérer tous les navires par flotte
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} fleet_id - L'identifiant de la flotte
* @returns {Object} - Liste de tous les navires appartenant à la flotte spécifiée
*/
router.route('/fleet/:fleet_id')
    .get(veryJWT, shipController.getAllShipsByFleet); 
    
/**
* Route : /api/v1/ship/customer/:cust_uuid
* Méthode : GET
* Description : Récupérer tous les navires par client
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} cust_uuid - L'identifiant du client
* @returns {Object} - Liste de tous les navires appartenant au client spécifié
*/
router.route('/customer/:cust_uuid')
    .get(veryJWT, shipController.getAllShipsByCustomer);

/**
* Route : /api/v1/ship/user/:user_uuid
* Méthode : GET
* Description : Récupérer tous les navires par utilisateur
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} user_uuid - L'identifiant de l'utilisateur
* @returns {Object} - Liste de tous les navires attribués à l'utilisateur spécifié
*/
router.route('/user/:user_uuid')
    .get(veryJWT, shipController.getAllShipsByUser);

module.exports = router;
