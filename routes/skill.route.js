/**
 * @swagger
 * tags:
 *   name: Skills
 *   description: Opérations liées aux compétences
 */

/**
 * @swagger
 * /skills:
 *   get:
 *     summary: Récupérer toutes les compétences
 *     tags: [Skills]
 *     responses:
 *       200:
 *         description: Succès - Renvoie toutes les compétences
 *       500:
 *         description: Erreur serveur - Impossible de récupérer toutes les compétences
 */

/**
 * @swagger
 * /skills:
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
 *               // Définissez ici les propriétés attendues dans la requête POST pour créer une nouvelle compétence
 *             example:
 *               // Exemple de corps de requête JSON pour créer une nouvelle compétence
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
 * /skills/:id:
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
 *         example: 123
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
 * /skills/:id:
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
 *         example: 123
 *     responses:
 *       200:
 *         description: Succès - La compétence a été supprimée avec succès
 *       404:
 *         description: Introuvable - Aucune compétence trouvée pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de supprimer la compétence
 */


// skill.route.js
const express = require('express');
const router = express.Router();
const { skillController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

// Handles GET and POST requests for '/skills' route
router.route('/')
    .get(veryJWT ,skillController.getAllSkills)     // Get all skills
    .post(veryJWT ,skillController.createNewSkill); // Create a new skill

// Handles GET and DELETE requests for '/skills/:id' route
router.route('/:id')
    .get(veryJWT ,skillController.getSkillById)    // Get a specific skill by ID
    .delete(veryJWT ,skillController.deleteSkill); // Delete a skill by ID

module.exports = router;
