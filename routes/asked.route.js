/**
 * @swagger
 * tags:
 *   name: Asked
 *   description: Les opérations liées aux éléments demandés (asked items).
 */

/**
 * @swagger
 * /api/v1/asked:
 *   get:
 *     summary: Récupérer tous les éléments demandés
 *     tags: [Asked]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Renvoie tous les éléments demandés
 *       500:
 *         description: Erreur serveur - Impossible de récupérer les éléments demandés
 */

/**
 * @swagger
 * /api/v1/asked/statistics:
 *   get:
 *     summary: Récupérer les statistiques de tous les éléments demandés
 *     tags: [Asked]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Renvoie tous les éléments demandés
 *       500:
 *         description: Erreur serveur - Impossible de récupérer les éléments demandés
 */

/**
 * @swagger
 * /api/v1/asked/chart:
 *   get:
 *     summary: Récupérer les statistiques de tous les éléments demandés pour la chart
 *     tags: [Asked]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Renvoie tous les éléments demandés
 *       500:
 *         description: Erreur serveur - Impossible de récupérer les éléments demandés
 */

/**
 * @swagger
 * /api/v1/asked/{id}:
 *   get:
 *     summary: Récupérer un élément demandé par ID
 *     tags: [Asked]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de l'utilisateur à supprimer
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "xxxxxxxx-xxx-xxx-xxxx-xxxxxxxxxx"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Renvoie l'élément demandé spécifié par ID
 *       404:
 *         description: Introuvable - Aucun élément demandé trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de récupérer l'élément demandé par ID
 */

/**
 * @swagger
 * /api/v1/asked/{id}:
 *   delete:
 *     summary: Supprimer un élément demandé par ID
 *     tags: [Asked]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de l'utilisateur à supprimer
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "xxxxxxxx-xxx-xxx-xxxx-xxxxxxxxxx"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - L'élément demandé a été supprimé avec succès
 *       404:
 *         description: Introuvable - Aucun élément demandé trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de supprimer l'élément demandé par ID
 */

const express = require('express');
const router = express.Router();
const { askedController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

/**
* Route : /api/v1/asked
* Méthode : GET
* Description : Récupérer tous les éléments demandés
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Liste des éléments demandés
*/
router.route('/')
  .get(veryJWT, askedController.getAllAsked);

/**
* Route : /api/v1/asked/client
* Méthode : GET
* Description : Récupérer tous les éléments demandés pour un client spécifique
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Liste des éléments demandés pour un client spécifique
*/
router.route('/client')
  .get(veryJWT, askedController.getAllAskedClient);

/**
* Route : /api/v1/asked/list/prfm
* Méthode : GET
* Description : Récupérer tous les éléments demandés PRFM
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Liste des éléments demandés PRFM
*/
router.route('/list/prfm')
  .get(veryJWT, askedController.getAllAskedPRFMSimple);

/**
* Route : /api/v1/asked/list/prma
* Méthode : GET
* Description : Récupérer tous les éléments demandés PRMA
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Liste des éléments demandés PRMA
*/
router.route('/list/prma')
  .get(veryJWT, askedController.getAllAskedPRMASimple);

/**
* Route : /api/v1/asked/list/prfs
* Méthode : GET
* Description : Récupérer tous les éléments demandés PRFS
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Liste des éléments demandés PRFS
*/
router.route('/list/prfs')
  .get(veryJWT, askedController.getAllAskedPRFSSimple);

/**
* Route : /api/v1/asked/statistics
* Méthode : GET
* Description : Récupérer les statistiques de tous les éléments demandés
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Statistiques des éléments demandés
*/
router.route('/statistics')
  .get(veryJWT, askedController.getGlobalStatisticsAsked);

/**
* Route : /api/v1/asked/statistics/client
* Méthode : GET
* Description : Récupérer les statistiques de tous les éléments demandés pour un client spécifique
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Statistiques des éléments demandés pour un client spécifique
*/
router.route('/statistics/client')
  .get(veryJWT, askedController.getGlobalStatisticsAskedClient);

/**
* Route : /api/v1/asked/chart
* Méthode : GET
* Description : Récupérer les statistiques de tous les éléments demandés pour la chart
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Statistiques des éléments demandés pour la chart
*/
router.route('/chart')
  .get(veryJWT, askedController.getGlobalStatisticsAskedForChart);

/**
* Route : /api/v1/asked/chart/client
* Méthode : GET
* Description : Récupérer les statistiques de tous les éléments demandés pour un client spécifique pour la chart
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Statistiques des éléments demandés pour un client spécifique pour la chart
*/
router.route('/chart/client')
  .get(veryJWT, askedController.getGlobalStatisticsAskedForChartClient);

/**
* Route : /api/v1/asked/:id
* Méthode : GET, DELETE
* Description : Récupérer ou supprimer un élément demandé par ID
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'ID de l'élément demandé
* @returns {Object} - L'élément demandé spécifié par ID
*/
router.route('/:id')
  .get(veryJWT, askedController.getAskedById)      
  .delete(veryJWT, askedController.deleteAsked);   

// Export du routeur
module.exports = router;
