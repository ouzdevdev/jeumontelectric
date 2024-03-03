/**
 * @swagger
 * tags:
 *   name: UserSkills
 *   description: Opérations liées aux compétences des utilisateurs
 */

/**
 * @swagger
 * /api/v1/userSkills:
 *   get:
 *     summary: Récupérer toutes les compétences des utilisateurs
 *     tags: [UserSkills]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Renvoie toutes les compétences des utilisateurs
 *       500:
 *         description: Erreur serveur - Impossible de récupérer toutes les compétences des utilisateurs
 */

/**
 * @swagger
 * /api/v1/userSkills:
 *   post:
 *     summary: Créer une nouvelle compétence utilisateur
 *     tags: [UserSkills]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Définissez ici les propriétés attendues dans la requête POST pour créer une nouvelle compétence utilisateur
 *             example:
 *               // Exemple de corps de requête JSON pour créer une nouvelle compétence utilisateur
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Succès - La compétence utilisateur a été créée avec succès
 *       400:
 *         description: Requête incorrecte - Assurez-vous que le corps de la requête est correctement formaté
 *       500:
 *         description: Erreur serveur - Impossible de créer la compétence utilisateur
 */

/**
 * @swagger
 * /api/v1/userSkills/{idUser}/{idSkill}:
 *   get:
 *     summary: Récupérer une compétence utilisateur par ID d'utilisateur et ID de compétence
 *     tags: [UserSkills]
 *     parameters:
 *       - name: idUser
 *         in: path
 *         required: true
 *         description: ID de l'utilisateur dont on souhaite récupérer la compétence
 *         schema:
 *           type: integer
 *         example: 123
 *       - name: idSkill
 *         in: path
 *         required: true
 *         description: ID de la compétence que l'on souhaite récupérer pour l'utilisateur
 *         schema:
 *           type: integer
 *         example: 456
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Renvoie la compétence utilisateur spécifiée par ID d'utilisateur et ID de compétence
 *       404:
 *         description: Introuvable - Aucune compétence utilisateur trouvée pour les ID spécifiés
 *       500:
 *         description: Erreur serveur - Impossible de récupérer la compétence utilisateur par ID d'utilisateur et ID de compétence
 */

/**
 * @swagger
 * /api/v1/userSkills/{idUser}/{idSkill}:
 *   delete:
 *     summary: Supprimer une compétence utilisateur par ID d'utilisateur et ID de compétence
 *     tags: [UserSkills]
 *     parameters:
 *       - name: idUser
 *         in: path
 *         required: true
 *         description: ID de l'utilisateur dont on souhaite supprimer la compétence
 *         schema:
 *           type: integer
 *         example: 123
 *       - name: idSkill
 *         in: path
 *         required: true
 *         description: ID de la compétence que l'on souhaite supprimer pour l'utilisateur
 *         schema:
 *           type: integer
 *         example: 456
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - La compétence utilisateur a été supprimée avec succès
 *       404:
 *         description: Introuvable - Aucune compétence utilisateur trouvée pour les ID spécifiés
 *       500:
 *         description: Erreur serveur - Impossible de supprimer la compétence utilisateur par ID d'utilisateur et ID de compétence
 */

const express = require('express');
const router = express.Router();
const { userSkillController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

/**
* Route : /api/v1/user-skill
* Méthode : GET
* Description : Récupérer toutes les compétences utilisateur
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Liste de toutes les compétences utilisateur
*/
router.route('/')
    .get(userSkillController.getAllUserSkills)     

/**
* Route : /api/v1/user-skill
* Méthode : POST
* Description : Créer une nouvelle compétence utilisateur
* Authentification requise : Oui
* Permissions requises : N/A
* @body {Object} skillData - Les données de la compétence utilisateur à créer
* @returns {Object} - La compétence utilisateur créée
*/
    .post(veryJWT ,userSkillController.createNewUserSkill);
    
/**
* Route : /api/v1/user-skill/:user
* Méthode : GET
* Description : Récupérer la compétence utilisateur par ID utilisateur
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} user - L'identifiant de l'utilisateur dont récupérer la compétence
* @returns {Object} - La compétence utilisateur correspondant à l'ID utilisateur spécifié
*/
router.route('/:user')
    .get(veryJWT ,userSkillController.getUserSkillById)    

/**
* Route : /api/v1/user-skill/:user
* Méthode : DELETE
* Description : Supprimer la compétence utilisateur par ID utilisateur
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} user - L'identifiant de l'utilisateur dont supprimer la compétence
* @returns {Object} - Confirmation de la suppression de la compétence utilisateur
*/
    .delete(veryJWT ,userSkillController.deleteUserSkill); 
    
module.exports = router;
