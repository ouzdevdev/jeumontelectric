/**
 * @swagger
 * tags:
 *   name: Skills
 *   description: Opérations liées aux compétences
 */

/**
 * @swagger
 * /api/v1/skills:
 *   get:
 *     summary: Récupérer toutes les compétences
 *     tags: [Skills]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Renvoie toutes les compétences
 *       500:
 *         description: Erreur serveur - Impossible de récupérer toutes les compétences
 */

/**
 * @swagger
 * /api/v1/skills:
 *   post:
 *     summary: Créer une nouvelle compétence
 *     tags: [Skills]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               skill_label:
 *                 type: string
 *             example:
 *               skill_label: "Skill label"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Succès - La compétence a été créée avec succès
 *       400:
 *         description: Requête incorrecte - Assurez-vous que le corps de la requête est correctement formaté
 *       500:
 *         description: Erreur serveur - Impossible de créer la compétence
 */

/**
 * @swagger
 * /api/v1/skills/{id}:
 *   get:
 *     summary: Récupérer une compétence par ID
 *     tags: [Skills]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la compétence à récupérer
 *         schema:
 *           type: integer
 *         example: 1
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Renvoie la compétence spécifiée par ID
 *       404:
 *         description: Introuvable - Aucune compétence trouvée pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de récupérer la compétence par ID
 */

/**
 * @swagger
 * /api/v1/skills/{id}:
 *   delete:
 *     summary: Supprimer une compétence par ID
 *     tags: [Skills]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la compétence à supprimer
 *         schema:
 *           type: integer
 *         example: 1
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - La compétence a été supprimée avec succès
 *       404:
 *         description: Introuvable - Aucune compétence trouvée pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de supprimer la compétence
 */

const express = require('express');
const router = express.Router();
const { skillController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

/**
* Route : /api/v1/skill
* Méthode : GET
* Description : Récupérer toutes les compétences
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Liste de toutes les compétences
*/
router.route('/')
    .get(veryJWT, skillController.getAllSkills)

/**
* Route : /api/v1/skill
* Méthode : POST
* Description : Créer une nouvelle compétence
* Authentification requise : Oui
* Permissions requises : N/A
* @body {Object} skillData - Les données de la compétence à créer
* @returns {Object} - La compétence créée
*/
    .post(veryJWT, skillController.createNewSkill); 
    
/**
* Route : /api/v1/skill/:id
* Méthode : GET
* Description : Récupérer une compétence par ID
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant de la compétence à récupérer
* @returns {Object} - La compétence correspondant à l'ID spécifié
*/
router.route('/:id')
    .get(veryJWT, skillController.getSkillById)    

/**
* Route : /api/v1/skill/:id
* Méthode : DELETE
* Description : Supprimer une compétence par ID
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant de la compétence à supprimer
* @returns {Object} - Confirmation de la suppression de la compétence
*/
    .delete(veryJWT, skillController.deleteSkill); 
    
module.exports = router;

