// attachement.controller.js
const { Attachment, Document } = require('../models');

/**
* Nom de la fonction : createAttachment
* Description : Crée une nouvelle pièce jointe et l'associe à un document existant.
* @param {Object} req - L'objet de requête contenant les fichiers et les données associées.
* @param {Object} res - L'objet de réponse pour envoyer la réponse au client.
* @returns {Object} - Un objet contenant un message de succès et les pièces jointes créées.
* @throws {Error} - Erreur si la création de la pièce jointe échoue.
* @example
* // Exemple d'utilisation de la fonction
* createAttachment(req, res);
*/
const createAttachment = async(req, res) => {
    try {
        const files = req.files; // Les fichiers joints reçus dans la requête
        const prfsId = req.body.prfsId; // L'ID du document parent associé aux pièces jointes

        // Création de chaque pièce jointe et association avec le document parent
        const attachments = await Promise.all(files.map(async file => {
            const newAttachment = await Attachment.create({
                attachment_label: file.originalname, // Nom original du fichier
                attachment_description: 'Description goes here', // Description de la pièce jointe
                doc_ref: 'Reference goes here', // Référence du document associé
                doc_description: 'Document description goes here', // Description du document associé
                doc_type: file.mimetype, // Type MIME du fichier
                doc_size: file.size, // Taille du fichier en octets
                doc_last_version: '1.0', // Version du document
                doc_localisation_numerique: 'Location goes here', // Localisation du document
                doc_url: file.path, // URL ou chemin d'accès au fichier
                asked_uuid: req.body.asked_uuid, // UUID de la demande associée
                user_uuid: req.body.user_uuid, // UUID de l'utilisateur associé
                cat_id: req.body.cat_id, // ID de la catégorie associée
            });

            // Recherche du document parent par son ID
            const document = await Document.findOne({ where: { prfsId: prfsId } });

            // Si le document parent est trouvé, ajoute la pièce jointe à sa liste de pièces jointes
            if (document) {
                await document.addAttachment(newAttachment);
            }

            return newAttachment; // Retourne la nouvelle pièce jointe créée
        }));

        res.status(201).json({ message: 'Attachments created successfully', attachments: attachments }); // Répond avec un message de succès et les pièces jointes créées
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' }); // En cas d'erreur, répond avec un message d'erreur interne du serveur
    }
};

module.exports = {
    createAttachment,
};
