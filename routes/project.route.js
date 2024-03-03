/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Opérations liées aux projets (projects)
 */

/**
 * @swagger
 * /api/v1/projects:
 *   get:
 *     summary: Récupérer tous les projets (projects)
 *     tags: [Projects]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Renvoie tous les projets (projects)
 *       500:
 *         description: Erreur serveur - Impossible de récupérer tous les projets (projects)
 */

/**
 * @swagger
 * /api/v1/projects:
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
 *               project_ref:
 *                 type: string
 *               project_label:
 *                 type: string
 *               project_description:
 *                 type: string
 *             example:
 *               project_ref: "#Project ref"
 *               project_label: "Project label"
 *               project_description: "Project description ..."
 *     security:
 *       - BearerAuth: []
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
 * /api/v1/projects/{id}:
 *   get:
 *     summary: Récupérer un projet (project) par ID
 *     tags: [Projects]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du projet (project) à récupérer
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "xxxxx-xxxx-xxxx-xxxxx-xxxxxxx"
 *     security:
 *       - BearerAuth: []
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
 * /api/v1/projects/{id}:
 *   delete:
 *     summary: Supprimer un projet (project) par ID
 *     tags: [Projects]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du projet (project) à supprimer
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "xxxxx-xxxx-xxxx-xxxxx-xxxxxxx"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Le projet (project) a été supprimé avec succès
 *       404:
 *         description: Introuvable - Aucun projet (project) trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de supprimer le projet (project)
 */

const express = require('express');
const router = express.Router();
const { projectController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

/**
* Route : /api/v1/projects
* Méthode : GET
* Description : Récupérer tous les projets
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Liste de tous les projets
*/
router.route('/')
    .get(veryJWT, projectController.getAllProjects)     

/**
* Route : /api/v1/projects
* Méthode : POST
* Description : Créer un nouveau projet
* Authentification requise : Oui
* Permissions requises : N/A
* @body {Object} projectData - Les données du projet à créer
* @returns {Object} - Le projet créé
*/
    .post(veryJWT, projectController.createNewProject); 

/**
* Route : /api/v1/projects/:id
* Méthode : GET
* Description : Récupérer un projet par ID
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant du projet à récupérer
* @returns {Object} - Le projet spécifié par ID
*/
router.route('/:id')
    .get(veryJWT, projectController.getProjectById)    

/**
* Route : /api/v1/projects/:id
* Méthode : DELETE
* Description : Supprimer un projet par ID
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant du projet à supprimer
* @returns {Object} - Confirmation de la suppression du projet
*/
    .delete(veryJWT, projectController.deleteProject); 
    
module.exports = router;
