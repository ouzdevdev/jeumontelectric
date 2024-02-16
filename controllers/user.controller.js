// user.controller.js
const { User, Role } = require('../models');

// @desc Get all users
// @route GET /api/users
// @access Private
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            include: [
                {
                    model: Role, // Exclude the 'role_id' field from the Role model
                },
            ],
            attributes: { exclude: ['role_id', 'user_password'] }, // Exclude the 'role_id' field from the User model
        });
        if (!users.length) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des utilisateurs.' });
    }
};

// @desc Create new user
// @route POST /api/users
// @access Private
const createNewUser = async (req, res) => {
    try {
        const {
            user_email,
            user_name,
            user_first_name,
            user_password,
            user_numero,
            user_whatsapp_uid,
            role_id,
        } = req.body;

        const user = await User.create({
            user_email,
            user_name,
            user_first_name,
            user_password,
            user_numero,
            user_whatsapp_uid,
            role_id,
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ 
            message: 'Une erreur est survenue lors de la création d\'un utilisateur.',
            error
        });
    }
};

// @desc Get user
// @route GET /api/users/:id
// @access Private
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
                    model: Role, // Exclude the 'role_id' field from the Role model
                },
            ],
            attributes: { exclude: ['role_id', 'user_password'] }, // Exclude the 'role_id' field from the User model
        });
        
        if (!user) {
            return res.status(404).json({ message: 'No user found' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des utilisateurs.' });
    }
};

// @desc Create new user
// @route POST /api/users
// @access Private
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'User ID is required' });
        }

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
        console.error(error.errors);
        res.status(500).json({ message: 'Une erreur est survenue lors de la création d\'un utilisateur.' });
    }
};

// @desc Get all users
// @route GET /api/users
// @access Private
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            user_email,
            user_name,
            user_first_name,
            user_password,
            user_numero,
            user_whatsapp_uid,
            role_id,
        } = req.body;

        User.update({ 
            user_email,
            user_name,
            user_first_name,
            user_password,
            user_numero,
            user_whatsapp_uid,
            role_id,        
        }, {
            where: { user_uuid: id } 
        });

        res.json({
            message: 'User was updated',
            userid: id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des utilisateurs.' });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createNewUser,
    updateUser,
    deleteUser,
};
