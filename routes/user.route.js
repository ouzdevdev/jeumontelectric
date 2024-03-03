/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Opérations liées aux utilisateurs
 */

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_email:
 *                 type: string
 *               user_name:
 *                 type: string
 *               user_first_name:
 *                 type: string
 *               user_password:
 *                 type: string
 *               user_numero:
 *                 type: string
 *               user_whatsapp_uid:
 *                 type: string
 *               role_id:
 *                 type: integer
 *             example:
 *               user_email: "user@gmail.com"
 *               user_name: "John"
 *               user_first_name: "Doe"
 *               user_password: "User1"
 *               user_numero: "+31888888888"
 *               user_whatsapp_uid: "123"
 *               role_id: 1
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Succès - L'utilisateur a été créé avec succès
 *       400:
 *         description: Requête incorrecte - Assurez-vous que le corps de la requête est correctement formaté
 *       500:
 *         description: Erreur serveur - Impossible de créer l'utilisateur
 */

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Mettre à jour un utilisateur par ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de l'utilisateur à mettre à jour
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "8e1646e1-5a35-4ae9-8cc2-74a1f767b597"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_email:
 *                 type: string
 *               user_name:
 *                 type: string
 *               user_first_name:
 *                 type: string
 *               user_password:
 *                 type: string
 *               user_numero:
 *                 type: string
 *               user_whatsapp_uid:
 *                 type: string
 *               role_id:
 *                 type: integer
 *             example:
 *               user_email: "user@gmail.com"
 *               user_name: "John"
 *               user_first_name: "Doe"
 *               user_password: "User1"
 *               user_numero: "+31888888888"
 *               user_whatsapp_uid: "123"
 *               role_id: 1
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - L'utilisateur a été mis à jour avec succès
 *       404:
 *         description: Introuvable - Aucun utilisateur trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de mettre à jour l'utilisateur
 */

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Récupérer un utilisateur par ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de l'utilisateur à récupérer
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "8e1646e1-5a35-4ae9-8cc2-74a1f767b597"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Renvoie l'utilisateur spécifié par ID
 *       404:
 *         description: Introuvable - Aucun utilisateur trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de récupérer l'utilisateur par ID
 */

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur par ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de l'utilisateur à supprimer
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "8e1646e1-5a35-4ae9-8cc2-74a1f767b597"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - L'utilisateur a été supprimé avec succès
 *       404:
 *         description: Introuvable - Aucun utilisateur trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de supprimer l'utilisateur
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Renvoie tous les utilisateurs
 *       500:
 *         description: Erreur serveur - Impossible de récupérer tous les utilisateurs
 */

const express = require('express');
const multer = require('multer');
const router = express.Router();
const { userController } = require('../controllers');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'files'); 
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } 
});

const veryJWT = require('../middlewares/verifyJWT');

/**
* Route : /api/v1/users
* Méthode : GET
* Description : Récupérer tous les utilisateurs
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Liste de tous les utilisateurs
*/
router.route('/')
  .get(userController.getAllUsers)    

/**
* Route : /api/v1/users
* Méthode : POST
* Description : Créer un nouvel utilisateur
* Authentification requise : Oui
* Permissions requises : N/A
* @body {Object} userData - Les données de l'utilisateur à créer
* @returns {Object} - L'utilisateur créé
*/
  .post(veryJWT ,userController.createNewUser); 

/**
* Route : /api/v1/users/stfsm
* Méthode : GET
* Description : Récupérer tous les utilisateurs STFSL
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Liste de tous les utilisateurs STFSL
*/
router.route('/stfsm')
  .get(userController.getAllUsersSTFSL);
  
/**
* Route : /api/v1/users/email/:email
* Méthode : GET
* Description : Récupérer un utilisateur par email
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} email - L'email de l'utilisateur à récupérer
* @returns {Object} - L'utilisateur correspondant à l'email spécifié
*/
router.route('/email/:email')
  .get(veryJWT ,userController.getUserByEmail); 

/**
* Route : /api/v1/users/:id
* Méthode : PUT
* Description : Mettre à jour un utilisateur
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant de l'utilisateur à mettre à jour
* @body {Object} userData - Les nouvelles données de l'utilisateur
* @returns {Object} - L'utilisateur mis à jour
*/
router.route('/:id')
  .put(veryJWT ,userController.updateUser)     

/**
* Route : /api/v1/users/:id
* Méthode : GET
* Description : Récupérer un utilisateur par ID
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant de l'utilisateur à récupérer
* @returns {Object} - L'utilisateur correspondant à l'ID spécifié
*/
  .get(veryJWT ,userController.getUserById)    

/**
* Route : /api/v1/users/:id
* Méthode : DELETE
* Description : Supprimer un utilisateur par ID
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant de l'utilisateur à supprimer
* @returns {Object} - Confirmation de la suppression de l'utilisateur
*/
  .delete(veryJWT ,userController.deleteUser); 

/**
* Route : /api/v1/users/password/:id
* Méthode : PUT
* Description : Mettre à jour le mot de passe d'un utilisateur
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant de l'utilisateur dont mettre à jour le mot de passe
* @body {Object} passwordData - Les nouvelles données de mot de passe
* @returns {Object} - Confirmation de la mise à jour du mot de passe
*/
router.route('/password/:id')
  .put(veryJWT ,userController.updatePasswordUser); 

/**
* Route : /api/v1/users/support/all
* Méthode : GET
* Description : Récupérer tous les utilisateurs de support
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Liste de tous les utilisateurs de support
*/
router.route('/support/all')
  .get(veryJWT, userController.getAllUsersSupport);

/**
* Route : /api/v1/users/feedback/send
* Méthode : POST
* Description : Envoyer des commentaires
* Authentification requise : Oui
* Permissions requises : N/A
* @body {Object} feedbackData - Les données de feedback
* @returns {Object} - Confirmation de l'envoi de feedback
*/
router.route('/feedback/send')
  .post(veryJWT, upload.single('file'), userController.sendFeedback);
  
module.exports = router;
