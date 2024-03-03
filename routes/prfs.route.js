/**
 * @swagger
 * tags:
 *   name: PRFS
 *   description: Opérations liées aux PRFS items (à remplacer par le nom approprié)
 */

/**
 * @swagger
 * /api/v1/prfs:
 *   get:
 *     summary: Récupérer tous les PRFS items
 *     tags: [PRFS]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Renvoie tous les PRFS items
 *       500:
 *         description: Erreur serveur - Impossible de récupérer tous les PRFS items
 */

/**
 * @swagger
 * /api/v1/prfs/{id}:
 *   get:
 *     summary: Récupérer un PRFS item par ID
 *     tags: [PRFS]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du PRFS item à récupérer
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "xxxxx-xxxx-xxxx-xxxxx-xxxxxxx"
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Renvoie le PRFS item spécifié par ID
 *       404:
 *         description: Introuvable - Aucun PRFS item trouvé pour l'ID spécifié
 *       500:
 *         description: Erreur serveur - Impossible de récupérer le PRFS item par ID
 */

const express = require('express');
const multer = require('multer');
const router = express.Router();
const { prfsController } = require('../controllers');
const cron = require('node-cron');

// Configuration de multer pour la gestion des fichiers uploadés
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'files'); // Spécifie le répertoire de destination des fichiers uploadés
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname; // Génère un nom de fichier unique
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage }); // Initialisation de multer avec la configuration de stockage

const veryJWT = require('../middlewares/verifyJWT');

/**
* Route : /api/v1/prfs
* Méthode : GET
* Description : Récupérer tous les PRFS (Performance Reports)
* Authentification requise : Oui
* Permissions requises : N/A
* @returns {Object} - Liste de tous les PRFS
*/
router.route('/') 
  .get(veryJWT, prfsController.getAllPRFS)

/**
* Route : /api/v1/prfs
* Méthode : POST
* Description : Créer un nouveau PRFS (Performance Report)
* Authentification requise : Oui
* Permissions requises : N/A
* @body {Object} prfsData - Les données du PRFS à créer
* @returns {Object} - Le PRFS créé
*/
  .post(veryJWT, prfsController.createPRFS);       

router.route('/:id')
  .get(veryJWT, prfsController.getPRFSById);

/**
* Route : /api/v1/prfs/update/prfs/:id/:user_uuid
* Méthode : PUT
* Description : Mettre à jour un PRFS
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} id - L'identifiant du PRFS à mettre à jour
* @param {string} user_uuid - L'identifiant de l'utilisateur
* @returns {Object} - Le PRFS mis à jour
*/
router.route('/update/prfs/:id/:user_uuid')
  .put(veryJWT, prfsController.updatePRFS); 

/**
* Route : /api/v1/prfs/upload/:asked/:user/:cat
* Méthode : POST
* Description : Charger des fichiers pour un élément demandé
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} asked - L'identifiant de l'élément demandé
* @param {string} user - L'identifiant de l'utilisateur
* @param {string} cat - La catégorie de fichier
* @body {Array} files - Les fichiers à télécharger
* @returns {Object} - Informations sur les fichiers téléchargés
*/
router.route('/upload/:asked/:user/:cat')
  .post(veryJWT, upload.array('files', 10), prfsController.uploadFilesAsked);

/**
* Route : /api/v1/prfs/attachement/:asked
* Méthode : GET
* Description : Récupérer les pièces jointes par élément demandé
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} asked - L'identifiant de l'élément demandé
* @returns {Object} - Liste des pièces jointes pour l'élément demandé
*/
router.route('/attachement/:asked')
  .get(veryJWT, prfsController.getAttachementsByAsked);

/**
* Route : /api/v1/prfs/attachement/files/:filename
* Méthode : GET
* Description : Récupérer une pièce jointe par nom de fichier
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} filename - Le nom du fichier
* @returns {File} - Le fichier attaché
*/
router.route('/attachement/files/:filename') 
  .get(veryJWT, prfsController.attachementByfilename);

/**
* Route : /api/v1/prfs/attachement/:attId
* Méthode : DELETE
* Description : Supprimer une pièce jointe par ID
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} attId - L'identifiant de la pièce jointe
* @returns {Object} - Confirmation de la suppression de la pièce jointe
*/
router.route('/attachement/:attId') 
  .delete(veryJWT, prfsController.deleteAttachement);

// Tâche cron pour effectuer une action régulière
cron.schedule('0 0 * * 6', prfsController.cronInfoForTicket);

module.exports = router;
