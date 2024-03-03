// askedEffect.controller.js
const { EffectAsked, Effect, Asked, AskedLog }  = require("../models");

/**
 * Nom de la fonction : getAllEffectByAsked
 * Récupérer toutes les demandes génériques
 * @param {String | uuid} asked_uuid - L'identifiant de ticket.
 */
const getAllEffectByAsked = async (req, res) => {
    try {
        const { asked_uuid } = req.params;

        const effects = await EffectAsked.findAll({
            where: { asked_uuid: asked_uuid },
            include: [{
                model: Effect,
            }]
        });

        res.json(effects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching asked list', error: error.message });
    }
};

/**
 * Nom de la fonction : createEffectForAsked
 * creer une demande générique par son ID
 * @param {String | uuid} asked_uuid - L'identifiant de ticket.
 * @param {String | uuid} user_uuid - L'identifiant d'utilisateur'.
 * @param {String | uuid} effect_id - L'identifiant effect.
 */
const createEffectForAsked = async (req, res) => {
    try {
        const { asked_uuid, effect_id, user_uuid } = req.body;

        if (!asked_uuid || !effect_id) {
            return res.status(400).json({ message: 'Asked or Effect ID is required' });
        }

        const effectToAskedFind = await EffectAsked.findOne({ where: { asked_uuid, effect_id } });

        if (effectToAskedFind) {
            return res.status(400).json({ message: 'Asked - Effect is exist' });
        }

        const asked = await Asked.findOne({
            where: {
                asked_uuid
            }
        })

        const effect = await Effect.findOne({
            where: {
                effect_id
            }
        })

        const effectToAsked = await EffectAsked.create({
            asked_uuid,
            effect_id
        });

        const updatedAskedLog = await AskedLog.create({
            asked_log_text: `add effect : ${effect.effect_label}  to asked : ${asked.asked_ref}`,
            asked_log_type_id: 4,
            asked_uuid: asked_uuid,
            user_uuid
        });

        res.json(effectToAsked);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching asked item', error: error.message });
    }
}

/**
 * Nom de la fonction : deleteEffectFromAsked
 * Supprimer une demande générique par son ID
 * @param {String | uuid} asked_uuid - L'identifiant de ticket.
 * @param {String | uuid} user_uuid - L'identifiant d'utilisateur'.
 * @param {String | uuid} effect_id - L'identifiant effect.
 */
const deleteEffectFromAsked = async (req, res) => {
    try {
        const { asked_uuid, effect_id, user_uuid } = req.params;

        if (!asked_uuid || !effect_id) {
            return res.status(400).json({ message: 'Asked or Effect ID is required' });
        }

        const deletedCount = await EffectAsked.destroy({ where: { asked_uuid, effect_id } });

        if (!deletedCount) {
            return res.status(404).json({ message: 'effect not found' });
        }

        const asked = await Asked.findOne({
            where: {
                asked_uuid
            }
        })

        const effect = await Effect.findOne({
            where: {
                effect_id
            }
        })

        const updatedAskedLog = await AskedLog.create({
            asked_log_text: `delete effect : ${effect.effect_label}  from asked : ${asked.asked_ref}`,
            asked_log_type_id: 3,
            asked_uuid: asked_uuid,
            user_uuid
        });

        res.json({ message: 'TagAsked deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting asked', error: error.message });
    }
}

module.exports = {
    createEffectForAsked,
    getAllEffectByAsked,
    deleteEffectFromAsked
}
