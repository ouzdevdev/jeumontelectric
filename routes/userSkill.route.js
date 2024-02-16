/**
 * @swagger
 * tags:
 *   name: UserSkills
 *   description: Opérations liées aux compétences des utilisateurs
 */

/**
 * @swagger
 * /userSkills:
 *   get:
 *     summary: Récupérer toutes les compétences des utilisateurs
 *     tags: [UserSkills]
 *     responses:
 *       200:
 *         description: Succès - Renvoie toutes les compétences des utilisateurs
 *       500:
 *         description: Erreur serveur - Impossible de récupérer toutes les compétences des utilisateurs
 */

/**
 * @swagger
 * /userSkills:
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
 * /userSkills/:idUser/:idSkill:
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
 * /userSkills/:idUser/:idSkill:
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
 *     responses:
 *       200:
 *         description: Succès - La compétence utilisateur a été supprimée avec succès
 *       404:
 *         description: Introuvable - Aucune compétence utilisateur trouvée pour les ID spécifiés
 *       500:
 *         description: Erreur serveur - Impossible de supprimer la compétence utilisateur par ID d'utilisateur et ID de compétence
 */

// userSkill.route.js
const express = require('express');
const router = express.Router();
const { userSkillController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

// Handles GET and POST requests for '/userSkills' route
router.route('/')
    .get(veryJWT ,userSkillController.getAllUserSkills)     // Get all user skills
    .post(veryJWT ,userSkillController.createNewUserSkill); // Create a new user skill

// Handles GET and DELETE requests for '/userSkills/:idUser/:idSkill' route
router.route('/:idUser/:idSkill')
    .get(veryJWT ,userSkillController.getUserSkillById)    // Get a specific user skill by user ID and skill ID
    .delete(veryJWT ,userSkillController.deleteUserSkill); // Delete a user skill by user ID and skill ID

module.exports = router;
