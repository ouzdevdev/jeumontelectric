// user.controller.js
const { Op } = require('sequelize');
const { User, Role } = require('../models');
const path = require('path');
const { sendEmailConnexion, sendEmailWithAttachments } = require('../utils/emailService');
const { sendWhatsAppMessage } = require('./twilio.controller');

/**
 * Récupère tous les utilisateurs.
 * @route GET /api/users
 * @access Privé
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Liste des utilisateurs trouvés.
 */
const getAllUsers = async (req, res) => {
    try {
        const { email } = req.query;
        const queryOptions = {
            include: [
                {
                    model: Role,
                },
            ],
            attributes: { exclude: ['role_id', 'user_password'] },
        };

        if (email) {
            queryOptions.where = {
                user_email: {
                    [Op.iLike]: `%${email}%`,
                },
            };
        }

        const users = await User.findAll(queryOptions);

        if (!users.length) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Une erreur est survenue lors de la récupération des utilisateurs.',
            error,
        });
    }
};

/**
 * Récupère tous les utilisateurs STFSL.
 * @route GET /api/users/stfsl
 * @access Privé
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Liste des utilisateurs STFSL trouvés.
 */
const getAllUsersSTFSL = async (req, res) => {
    try {
        
        const queryOptions = {
            attributes: { exclude: ['user_password'] },
            where: {
                role_id: {
                  [Op.in]: [1, 2],
                },
            },
        };

        const users = await User.findAll(queryOptions);

        if (!users.length) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Une erreur est survenue lors de la récupération des utilisateurs.',
            error,
        });
    }
}

/**
 * Récupère tous les utilisateurs support.
 * @route GET /api/users/support
 * @access Privé
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Liste des utilisateurs support trouvés.
 */
const getAllUsersSupport = async (req, res) => {
    try {
        const { email } = req.query;
        const queryOptions = {
            attributes: { exclude: ['user_password'] },
            where: {
                role_id: {
                  [Op.in]: [1, 2, 4],
                },
            },
        };

        if (email) {
            queryOptions.where = {
                user_email: {
                    [Op.iLike]: `%${email}%`,
                },
            };
        }

        const users = await User.findAll(queryOptions);

        if (!users.length) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Une erreur est survenue lors de la récupération des utilisateurs.',
            error,
        });
    }
};

/**
 * Crée un nouvel utilisateur.
 * @route POST /api/users
 * @access Privé
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Utilisateur créé.
 */
const createNewUser = async (req, res) => {
    try {
        const {
            user_email,
            user_name,
            user_first_name,
            user_numero,
            role_id,
        } = req.body;

        const user = await User.create({
            user_email,
            user_name,
            user_first_name,
            user_numero,
            role_id,
        });

        const templatePath = path.join(__dirname, '..', 'public', 'mail', 'connexion.html');

        sendEmailConnexion(user.user_email, 'Welcome to Our Platform', templatePath, user);
        
        res.json(user);
    } catch (error) {
        res.status(500).json({ 
            message: 'Une erreur est survenue lors de la création d\'un utilisateur.',
            error
        });
    }
};

/**
 * Récupère un utilisateur par son email.
 * @route GET /api/users/email/:email
 * @access Privé
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Utilisateur trouvé.
 */
const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        if (!email) {
            return res.status(400).json({ message: 'User Email is required' });
        }
        const user = await User.findOne({ 
            where: { user_email: email } ,
            attributes: { exclude: ['user_password'] }, 
        });
        
        if (!user) {
            return res.status(404).json({ message: 'No user found' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: 'Une erreur est survenue lors de la récupération des utilisateurs.' ,
            error
        });
    }
};

/**
 * Récupère un utilisateur par son ID.
 * @route GET /api/users/:id
 * @access Privé
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Utilisateur trouvé.
 */
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const user = await User.findOne({ 
            where: { user_uuid: id } ,
            include: [
                {
                    model: Role, // Exclude
                },
            ],
            attributes: { exclude: ['role_id', 'user_password'] }, // Exclude
        });
        
        if (!user) {
            return res.status(404).json({ message: 'No user found' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: 'Une erreur est survenue lors de la récupération des utilisateurs.' ,
            error
        });
    }
};

/**
 * Supprime un utilisateur.
 * @route DELETE /api/users/:id
 * @access Privé
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Message de confirmation de suppression.
 */
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const user = await User.findOne({ where: { user_uuid: id }});

        await User.destroy({
            where: { 
                user_uuid: id 
            },
        });

        res.json({
            message: 'User was deleted',
            userid: id
        });

    } catch (error) {
        res.status(500).json({ 
            message: 'Une erreur est survenue lors de la suppression d\'un utilisateur.',
            error
        });
    }
};

/**
 * Met à jour les informations d'un utilisateur.
 * @route PUT /api/users/:id
 * @access Privé
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Message de confirmation de mise à jour.
 */
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            user_email,
            user_name,
            user_first_name,
            user_numero,
            role_id,
        } = req.body;

        User.update({ 
            user_email,
            user_name,
            user_first_name,
            user_numero,
            role_id,        
        }, {
            where: { user_uuid: id } 
        });

        res.json({
            message: 'User was updated',
            userid: id
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Une erreur est survenue lors de la modification des utilisateurs.' ,
            error
        });
    }
};

/**
 * Met à jour le mot de passe d'un utilisateur.
 * @route PUT /api/users/password/:id
 * @access Privé
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Message de confirmation de mise à jour du mot de passe.
 */
const updatePasswordUser = async (req, res) => {
    try {
        const { id } = req.params;
        
        const {
            user_password,
            user_password_confirm
        } = req.body;

        // Vérification des mots de passe
        if (user_password !== user_password_confirm) {
            return res.status(400).json({ message: "Les mots de passe ne correspondent pas." });
        }

        // Mettre à jour le mot de passe de l'utilisateur (assurez-vous de gérer la sécurité et le hachage du mot de passe)
        // User.update({ user_password: hashedPassword }, { where: { user_uuid: id } });


        await User.update({ 
            user_password,        
        }, {
            where: { user_uuid: id } 
        });

        const user = await User.findOne({ 
            where: { user_uuid: id } ,
            attributes: { exclude: ['role_id', 'user_password'] }, 
        });

        res.json({
            message: 'User password was updated',
            userid: id
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Une erreur est survenue lors de la modification du mot de passe de l\'utilisateur.' ,
            error
        });
    }
};

/**
 * Envoie un message de feedback.
 * @route PUT /api/users/feedback/send
 * @access Privé
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Message de confirmation d'envoi de feedback.
 */
const sendFeedback = async (req, res) => {
    try {
        const {
            email,
            subject,
            description,
        } = req.body;

        const attachment = req.file;

        console.log(req.body);
        console.log(req.file);
        console.log('File size:', req.file.size);

        const emailData = {
            message: `${email}: ${description}`,
        };
    
        const templatePath = path.join(__dirname, '..', 'public', 'mail', 'mailtoJeumont.html');

        sendEmailWithAttachments('cheick.dione-ext@jeumontelectric.com', subject, templatePath, emailData, attachment);
        sendWhatsAppMessage(emailData.message);

        res.json({
            message: 'Message send to feedback'
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Une erreur est survenue lors de l\'envoi du feedback.' ,
            error
        });
    }
};


module.exports = {
    getAllUsers,
    getUserById,
    getAllUsersSTFSL,
    getAllUsersSupport,
    getUserByEmail,
    createNewUser,
    updateUser,
    deleteUser,
    sendFeedback,
    updatePasswordUser
};
