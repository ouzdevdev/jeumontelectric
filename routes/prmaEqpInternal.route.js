const express = require('express');
const router = express.Router();
const { prmaEqpInternalController } = require('../controllers');

const veryJWT = require('../middlewares/verifyJWT');

/**
* Route : /api/v1/prma_eqp_internal/:asked_uuid
* Méthode : GET
* Description : Trouver toutes les entrées PRMA (Preventive Maintenance Reports) liées à un élément demandé spécifique
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} asked_uuid - L'identifiant de l'élément demandé
* @returns {Object} - Liste de toutes les entrées PRMA liées à l'élément demandé spécifié par ID
*/
router.route('/:asked_uuid')  
    .get(veryJWT, prmaEqpInternalController.findAllbyAsked)

/**
* Route : /api/v1/prma_eqp_internal/:asked_uuid
* Méthode : DELETE
* Description : Supprimer toutes les entrées PRMA liées à un élément demandé spécifique
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} asked_uuid - L'identifiant de l'élément demandé
* @returns {Object} - Confirmation de la suppression de toutes les entrées PRMA liées à l'élément demandé spécifié par ID
*/
    .delete(veryJWT, prmaEqpInternalController.deletePrmaEqpInternal)

/**
* Route : /api/v1/prma_eqp_internal/:asked_uuid
* Méthode : POST
* Description : Créer une nouvelle entrée PRMA liée à un élément demandé spécifique
* Authentification requise : Oui
* Permissions requises : N/A
* @param {string} asked_uuid - L'identifiant de l'élément demandé
* @body {Object} prmaEqpData - Les données de l'entrée PRMA à créer
* @returns {Object} - La nouvelle entrée PRMA créée liée à l'élément demandé spécifié par ID
*/
    .post(veryJWT, prmaEqpInternalController.createPrmaEqpInternal); 
    
module.exports = router;
