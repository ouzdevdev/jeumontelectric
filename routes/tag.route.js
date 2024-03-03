/**
 * @swagger
 * tags:
 *   name: Tags
 *   description: Opérations liées aux tags
 */

/**
 * @swagger
 * /api/v1/tags:
 *   get:
 *     summary: Récupérer tous les tags
 *     tags: [Tags]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Renvoie tous les tags
 *       500:
 *         description: Erreur serveur - Impossible de récupérer tous les tags
 */

/**
 * @swagger
 * /api/v1/tags:
 *   post:
 *     summary: Créer un nouveau tag
 *     tags: [Tags]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tag_label:
 *                 type: string
 *             example:
 *               tag_label: "Tag label"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Succès - Le tag a été créé avec succès
 *       400:
 *         description: Requête incorrecte - Assurez-vous que le corps de la requête est correctement formaté
 *       500:
 *         description: Erreur serveur - Impossible de créer le tag
 */

/**
 * @swagger
 * /api/v1/tags/{id}:
 *   get:
 *     summary: Récupérer un tag par ID
 *     tags: [Tags]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du tag à récupérer
 *         schema:
 *           type: integer
 *         example: 1
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Renvoie le tag spécifié par ID
 *       404:
 *         description: Introuvable - Aucun tag trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de récupérer le tag par ID
 */

/**
 * @swagger
 * /api/v1/tags/{id}:
 *   put:
 *     summary: Mettre à jour un tag par ID
 *     tags: [Tags]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du tag à mettre à jour
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tag_label:
 *                 type: string
 *             example:
 *               tag_label: "TAG"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Le tag a été mis à jour avec succès
 *       404:
 *         description: Introuvable - Aucun tag trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de mettre à jour le tag
 */

/**
 * @swagger
 * /api/v1/tags/{id}:
 *   delete:
 *     summary: Supprimer un tag par ID
 *     tags: [Tags]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du tag à supprimer
 *         schema:
 *           type: integer
 *         example: 1
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Le tag a été supprimé avec succès
 *       404:
 *         description: Introuvable - Aucun tag trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de supprimer le tag
 */

const express = require('express');
const router = express.Router();
const { tagController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

/**
* Route : /api/v1/tag
* Méthode : GET
* Description : Récupérer tous les tags
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Liste de tous les tags
*/
router.route('/')
  .get(veryJWT ,tagController.getAllTags)     

/**
* Route : /api/v1/tag
* Méthode : POST
* Description : Créer un nouveau tag
* Authentification requise : Oui
* Permissions requises : N/A
* @body {Object} tagData - Les données du tag à créer
* @returns {Object} - Le tag créé
*/
  .post(veryJWT ,tagController.createNewTag); 
  
/**
* Route : /api/v1/tag/:id
* Méthode : GET
* Description : Récupérer un tag par ID
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant du tag à récupérer
* @returns {Object} - Le tag correspondant à l'ID spécifié
*/
router.route('/:id')
  .get(veryJWT ,tagController.getTagById)    

/**
* Route : /api/v1/tag/:id
* Méthode : PUT
* Description : Mettre à jour un tag par ID
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant du tag à mettre à jour
* @body {Object} tagData - Les nouvelles données du tag
* @returns {Object} - Le tag mis à jour
*/
  .put(veryJWT ,tagController.updateTag)     

/**
* Route : /api/v1/tag/:id
* Méthode : DELETE
* Description : Supprimer un tag par ID
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant du tag à supprimer
* @returns {Object} - Confirmation de la suppression du tag
*/
  .delete(veryJWT ,tagController.deleteTag); 
  
module.exports = router;
