// prmaEqpInternal.controller.js
const { PrmaEqpInternal, EquipementInterne } = require('../models');

/**
 * Crée un nouvel équipement interne pour une demande PRMA.
 * @route POST /api/prma-equipments-internal/:asked_uuid
 * @access Privé
 * @param {string} asked_uuid - L'UUID de la demande PRMA.
 * @param {Object} req.body - Les informations sur l'équipement interne.
 * @param {Object} req.body.piece - Les informations sur la pièce de l'équipement interne.
 * @param {string} req.body.piece.piece_uuid - L'UUID de la pièce.
 * @param {number} req.body.quantity - La quantité de l'équipement interne.
 * @param {string} req.body.purchase_order_number - Le numéro de bon de commande.
 * @param {Date} req.body.expected_date - La date prévue.
 * @param {string} req.body.status_ifs - Le statut IFS.
 * @returns {Object} - Le nouvel équipement interne créé.
 * @throws {Error} - Une erreur si la création de l'équipement interne échoue.
 * @example
 * // Exemple d'appel de la fonction
 * createPrmaEqpInternal(req, res);
 */
const createPrmaEqpInternal = async (req, res) => {
    try {
        const { asked_uuid } = req.params;

        const {  
            piece,
            quantity,
            purchase_order_number,
            expected_date,
            status_ifs
        } = req.body;

        const newPrmaEqpInternal = await PrmaEqpInternal.create({
            asked_uuid,
            piece_uuid: piece.piece_uuid,
            quantity,
            purchase_order_number,
            expected_date,
            status_ifs
        });

        res.status(201).json(newPrmaEqpInternal);
    } catch (error) {
        res.status(500).json({ 
            message: error.message, 
            error: error 
        });
    }
}

/**
 * Supprime un équipement interne PRMA par son ID de demande.
 * @route DELETE /api/prma-equipments-internal/:asked_uuid
 * @access Privé
 * @param {string} asked_uuid - L'UUID de la demande PRMA.
 * @returns {Object} - Message de succès.
 * @throws {Error} - Une erreur si la suppression de l'équipement interne échoue ou s'il n'est pas trouvé.
 * @example
 * // Exemple d'appel de la fonction
 * deletePrmaEqpInternal(req, res);
 */
const deletePrmaEqpInternal = async (req, res) => {
    try {
        const { asked_uuid } = req.params;
        
        const deletedCount = await PrmaEqpInternal.destroy({ 
            where: { 
                prma_eqp_internal_ref: asked_uuid 
            } 
        });

        if (!deletedCount) {
            return res.status(404).json({ message: 'Équipement interne PRMA non trouvé' });
        }
        
        res.status(200).json({ message: 'Équipement interne PRMA supprimé avec succès' });

    } catch (error) {
        res.status(500).json({ 
            message: error.message, 
            error: error 
        });
    }
}

/**
 * Trouve tous les équipements internes PRMA pour une demande donnée.
 * @route GET /api/prma-equipments-internal/:asked_uuid
 * @access Privé
 * @param {string} asked_uuid - L'UUID de la demande PRMA.
 * @returns {Array<Object>} - Les équipements internes PRMA trouvés.
 * @throws {Error} - Une erreur si la récupération des équipements internes PRMA échoue.
 * @example
 * // Exemple d'appel de la fonction
 * findAllbyAsked(req, res);
 */
const findAllbyAsked = async (req, res) => {
    try {

        const { asked_uuid } = req.params;

        const prmasEqpInternal = await PrmaEqpInternal.findAll({
            where: {
                asked_uuid
            }, 
            include: [
                {
                    model: EquipementInterne,
                },
            ]
        });

        res.status(200).json(prmasEqpInternal);
    } catch (error) {
        res.status(500).json({ 
            message: error.message, 
            error: error 
        });
    }
}

module.exports = {
    createPrmaEqpInternal,
    deletePrmaEqpInternal,
    findAllbyAsked
};
