/**
 * @swagger
 * tags:
 *   name: PRFM
 *   description: Opérations liées aux PRFM items (à remplacer par le nom approprié)
 */

/**
 * @swagger
 * /api/v1/prfm:
 *   get:
 *     summary: Récupérer tous les PRFM items
 *     tags: [PRFM]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Renvoie tous les PRFM items
 *       500:
 *         description: Erreur serveur - Impossible de récupérer tous les PRFM items
 */

/**
 * @swagger
 * /api/v1/prfm/{id}:
 *   get:
 *     summary: Récupérer un PRFM item par ID
 *     tags: [PRFM]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du PRFM item à récupérer
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "xxxxx-xxxx-xxxx-xxxxx-xxxxxxx"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Renvoie le PRFM item spécifié par ID
 *       404:
 *         description: Introuvable - Aucun PRFM item trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de récupérer le PRFM item par ID
 */

const express = require('express');
const router = express.Router();
const { prfmController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

/**
* Route : /api/v1/prfm
* Méthode : GET
* Description : Récupérer tous les PRFM (Performance Reports)
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Liste de tous les PRFM
*/
router.route('/') 
  .get(veryJWT, prfmController.getAllPRFM) 

/**
* Route : /api/v1/prfm
* Méthode : POST
* Description : Créer un nouveau PRFM (Performance Report)
* Authentification requise : Oui
* Permissions requises : N/A
* @body {Object} prfmData - Les données du PRFM à créer
* @returns {Object} - Le PRFM créé
*/
  .post(veryJWT, prfmController.createPRFM);

/**
* Route : /api/v1/prfm/:id
* Méthode : GET
* Description : Récupérer un PRFM par ID
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant du PRFM à récupérer
* @returns {Object} - Le PRFM spécifié par ID
*/
router.route('/:id')
  .get(veryJWT, prfmController.getPRFMById);

/**
* Route : /api/v1/prfm/:id/:user_uuid
* Méthode : PUT
* Description : Mettre à jour un PRFM
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant du PRFM à mettre à jour
* @param {string} user_uuid - L'identifiant de l'utilisateur
* @returns {Object} - Le PRFM mis à jour
*/
router.route('/:id/:user_uuid')
  .put(veryJWT, prfmController.uploadPRFM);

/**
* Route : /api/v1/prfm/related/:id
* Méthode : GET
* Description : Récupérer les PRFS (Performance Reports) liés à un PRFM spécifique
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant du PRFM
* @returns {Object} - Liste des PRFS liés au PRFM spécifié par ID
*/
router.route('/related/:id')
  .get(veryJWT, prfmController.getRelatedPrfs);

/**
* Route : /api/v1/prfm/related
* Méthode : POST
* Description : Ajouter des PRFS à un PRFM
* Authentification requise : Oui
* Permissions requises : N/A
* @body {Object} data - Les données pour ajouter des PRFS à un PRFM
* @returns {Object} - Confirmation de l'ajout des PRFS au PRFM
*/
router.route('/related')
  .post(veryJWT, prfmController.addPrfsToPrfm);

/**
* Route : /api/v1/prfm/related/:asked_prfs_uuid/:asked_prfm_uuid
* Méthode : DELETE
* Description : Supprimer la relation entre un PRFS et un PRFM
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} asked_prfs_uuid - L'identifiant du PRFS
* @param {string} asked_prfm_uuid - L'identifiant du PRFM
* @returns {Object} - Confirmation de la suppression de la relation
*/
router.route('/related/:asked_prfs_uuid/:asked_prfm_uuid')
  .delete(veryJWT, prfmController.deleteRelated);

module.exports = router;
