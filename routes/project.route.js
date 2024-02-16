/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Opérations liées aux projets (projects)
 */

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Récupérer tous les projets (projects)
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: Succès - Renvoie tous les projets (projects)
 *       500:
 *         description: Erreur serveur - Impossible de récupérer tous les projets (projects)
 */

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Créer un nouveau projet (project)
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Définissez ici les propriétés attendues dans la requête POST pour créer un nouveau projet (project)
 *             example:
 *               // Exemple de corps de requête JSON pour créer un nouveau projet (project)
 *     responses:
 *       201:
 *         description: Succès - Le projet (project) a été créé avec succès
 *       400:
 *         description: Requête incorrecte - Assurez-vous que le corps de la requête est correctement formaté
 *       500:
 *         description: Erreur serveur - Impossible de créer le projet (project)
 */

/**
 * @swagger
 * /projects/:id:
 *   get:
 *     summary: Récupérer un projet (project) par ID
 *     tags: [Projects]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du projet (project) à récupérer
 *         schema:
 *           type: integer
 *         example: 123
 *     responses:
 *       200:
 *         description: Succès - Renvoie le projet (project) spécifié par ID
 *       404:
 *         description: Introuvable - Aucun projet (project) trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de récupérer le projet (project) par ID
 */

/**
 * @swagger
 * /projects/:id:
 *   delete:
 *     summary: Supprimer un projet (project) par ID
 *     tags: [Projects]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du projet (project) à supprimer
 *         schema:
 *           type: integer
 *         example: 123
 *     responses:
 *       200:
 *         description: Succès - Le projet (project) a été supprimé avec succès
 *       404:
 *         description: Introuvable - Aucun projet (project) trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de supprimer le projet (project)
 */

// project.route.js
const express = require('express');
const router = express.Router();
const { projectController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

// Handles GET and POST requests for '/projects' route
router.route('/')
    .get(veryJWT ,projectController.getAllProjects)     // Get all projects
    .post(veryJWT ,projectController.createNewProject); // Create a new project

// Handles GET and DELETE requests for '/projects/:id' route
router.route('/:id')
    .get(veryJWT ,projectController.getProjectById)    // Get a specific project by ID
    .delete(veryJWT ,projectController.deleteProject); // Delete a project by ID

module.exports = router;
