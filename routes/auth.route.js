/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Opérations liées à l'authentification
 */

/**
 * @swagger
 * /api/v1/auth/token:
 *   post:
 *     summary: Authentification de l'utilisateur
 *     tags: [Authentication]
 *     description: Authentifie un utilisateur et renvoie un jeton d'accès
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: user@gmail.com
 *               password: User1
 *     responses:
 *       200:
 *         description: Succès - L'authentification a réussi, renvoie un jeton d'accès
 *       401:
 *         description: Échec de l'authentification - Les identifiants fournis sont invalides
 *       500:
 *         description: Erreur serveur - Impossible de traiter la demande d'authentification
 */

const express = require('express');
const router = express.Router();
const authController = require('../authentication/auth.controller')

const verifyJWT = require('../middlewares/verifyJWT');

/**
* Route : /api/v1/auth/token
* Méthode : POST
* Description : Se connecter et obtenir un token d'authentification
* Authentification requise : Non
* Permissions requises : N/A
* @body {Object} userData - Les données de l'utilisateur (email, mot de passe)
* @returns {Object} - Token d'authentification
*/
router.route('/token')
    .post(authController.login);

/**
* Route : /api/v1/auth/forget
* Méthode : POST
* Description : Envoyer un email de réinitialisation de mot de passe
* Authentification requise : Non
* Permissions requises : N/A
* @body {Object} emailData - Les données de l'email (adresse email de l'utilisateur)
* @returns {Object} - Message de succès ou d'erreur de réinitialisation de mot de passe
*/
router.route('/forget')
    .post(authController.forget);

/**
* Route : /api/v1/auth/token/refresh
* Méthode : POST
* Description : Actualiser un token d'authentification expiré
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Nouveau token d'authentification
*/
router.route('/token/refresh')
    .post(verifyJWT, authController.refresh);

module.exports = router;
