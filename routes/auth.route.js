/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Opérations liées à l'authentification
 */

/**
 * @swagger
 * /token:
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
 *               // Définissez ici les propriétés attendues dans la requête POST (par exemple, username, password)
 *             example:
 *               // Exemple de corps de requête JSON
 *     responses:
 *       200:
 *         description: Succès - L'authentification a réussi, renvoie un jeton d'accès
 *       401:
 *         description: Échec de l'authentification - Les identifiants fournis sont invalides
 *       500:
 *         description: Erreur serveur - Impossible de traiter la demande d'authentification
 */

/**
 * @swagger
 * /token/refresh:
 *   post:
 *     summary: Rafraîchir le jeton d'accès
 *     tags: [Authentication]
 *     description: Rafraîchit le jeton d'accès expiré et renvoie un nouveau jeton
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Définissez ici les propriétés attendues dans la requête POST (par exemple, le jeton d'accès expiré)
 *             example:
 *               // Exemple de corps de requête JSON
 *     responses:
 *       200:
 *         description: Succès - Le jeton d'accès a été rafraîchi avec succès, renvoie le nouveau jeton
 *       401:
 *         description: Échec du rafraîchissement - Le jeton d'accès fourni est invalide ou expiré
 *       500:
 *         description: Erreur serveur - Impossible de rafraîchir le jeton d'accès
 */

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Déconnexion de l'utilisateur
 *     tags: [Authentication]
 *     description: Déconnecte un utilisateur et invalide le jeton d'accès
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Définissez ici les propriétés attendues dans la requête POST (par exemple, le jeton d'accès)
 *             example:
 *               // Exemple de corps de requête JSON
 *     responses:
 *       200:
 *         description: Succès - L'utilisateur a été déconnecté avec succès
 *       401:
 *         description: Échec de la déconnexion - Le jeton d'accès fourni est invalide ou expiré
 *       500:
 *         description: Erreur serveur - Impossible de traiter la demande de déconnexion
 */


const express = require('express');
const router = express.Router();
const authController = require('../authentication/auth.controller')

const verifyJWT = require('../middlewares/verifyJWT');


router.route('/token')
    .post(authController.login);

router.route('/token/refresh')
    .post(verifyJWT, authController.refresh);

router.route('/logout')
    .post(authController.login);

module.exports = router;