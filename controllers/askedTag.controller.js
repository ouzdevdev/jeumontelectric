// askedTag.controller.js
const { TagAsked, Tag, Asked, AskedLog } = require('../models');

/**
* Nom de la fonction : getAllTagsByAsked
* Description : Récupère toutes les balises associées à une demande générique.
* @param {String} asked_uuid - L'UUID de la demande générique.
* @returns {Object} - Un tableau contenant toutes les balises associées à la demande générique spécifiée.
* @throws {Error} - Erreur si la récupération des balises échoue.
* @example
* // Exemple d'appel de la fonction
* getAllTagsByAsked('asked_uuid');
*/
const getAllTagsByAsked = async (req, res) => {
    try {
        const { asked_uuid } = req.params;

        const tags = await TagAsked.findAll({
            where: { asked_uuid: asked_uuid },
            include: [{
                model: Tag,
            }]
        });

        res.json(tags);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching asked list', error: error.message });
    }
};

/**
* Nom de la fonction : createTagForAsked
* Description : Crée une nouvelle balise pour une demande générique.
* @param {String} asked_uuid - L'UUID de la demande générique.
* @param {String} tag_id - L'ID de la balise à ajouter.
* @param {String} user_uuid - L'UUID de l'utilisateur effectuant l'action.
* @returns {Object} - La balise associée à la demande générique créée.
* @throws {Error} - Erreur si les données pour créer la balise sont invalides ou si une balise similaire existe déjà.
* @example
* // Exemple d'appel de la fonction
* createTagForAsked({ asked_uuid: 'asked_uuid', tag_id: 'tag_id', user_uuid: 'user_uuid' });
*/
const createTagForAsked = async (req, res) => {
    try {
        const { asked_uuid, tag_id, user_uuid } = req.body;
        
        if (!asked_uuid || !tag_id) {
            return res.status(400).json({ message: 'Asked or tag ID is required' });
        }

        const tagToAskedFind = await TagAsked.findOne({ where: { asked_uuid, tag_id } });

        if (tagToAskedFind) {
            return res.status(400).json({ message: 'Asked - Tag already exists' });
        }

        const asked = await Asked.findOne({
            where: {
                asked_uuid
            }
        });

        const tag = await Tag.findOne({
            where: {
                tag_id
            }
        });

        const tagAsked = await TagAsked.create({
            asked_uuid,
            tag_id
        });

        const updatedAskedLog = await AskedLog.create({
            asked_log_text: `add tag : ${tag.tag_label}  to asked : ${asked.asked_ref}`, 
            asked_log_type_id: 4,
            asked_uuid: asked_uuid,
            user_uuid
        });
        
        res.json(tagAsked);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching asked item', error: error.message });
    }
}

/**
* Nom de la fonction : deleteTagFromAsked
* Description : Supprime une balise associée à une demande générique.
* @param {String} asked_uuid - L'UUID de la demande générique.
* @param {String} tag_id - L'ID de la balise à supprimer.
* @param {String} user_uuid - L'UUID de l'utilisateur effectuant l'action.
* @returns {Object} - Un message indiquant que la balise associée à la demande générique a été supprimée avec succès.
* @throws {Error} - Erreur si la suppression de la balise échoue.
* @example
* // Exemple d'appel de la fonction
* deleteTagFromAsked('asked_uuid', 'tag_id', 'user_uuid');
*/
const deleteTagFromAsked = async (req, res) => {
    try {
        const { asked_uuid, tag_id, user_uuid } = req.params;
        if (!asked_uuid || !tag_id) {
            return res.status(400).json({ message: 'Asked or tag ID is required' });
        }
        const deletedCount = await TagAsked.destroy({ where: { asked_uuid, tag_id } });
        
        if (!deletedCount) {
            return res.status(404).json({ message: 'TagAsked not found' });
        }

        const asked = await Asked.findOne({
            where: {
                asked_uuid
            }
        });

        const tag = await Tag.findOne({
            where: {
                tag_id
            }
        });

        const updatedAskedLog = await AskedLog.create({
            asked_log_text: `delete tag : ${tag.tag_label}  from asked : ${asked.asked_ref}`, 
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
    createTagForAsked,
    getAllTagsByAsked,
    deleteTagFromAsked
}
