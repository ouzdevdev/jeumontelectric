// role.controller.js
const { Role } = require('../models');

/**
 * Nom de la fonction : getAllRoles
 * Description : Récupère tous les rôles.
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Liste des rôles trouvés.
 * @route GET /api/roles
 * @access Private
 * @example
 * // Exemple d'utilisation de la fonction
 * getAllRoles(req, res);
 */
const getAllRoles = async (req, res) => {
    try {
        const roles = await Role.findAll();

        if (!roles.length) {
            return res.status(404).json({ message: 'No roles found' });
        }

        res.json(roles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching roles', error: error.message });
    }
}

/**
 * Nom de la fonction : getRoleById
 * Description : Récupère un rôle par son identifiant.
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Rôle trouvé.
 * @route GET /api/roles/:id
 * @access Private
 * @example
 * // Exemple d'utilisation de la fonction
 * getRoleById(req, res);
 */
const getRoleById = async (req, res) => {
    try {
        const { id } = req.params;

        const role = await Role.findOne({ 
            where: { 
                role_id: id 
            } 
        });

        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }

        res.json(role);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching role', error: error.message });
    }
}

/**
 * Nom de la fonction : createNewRole
 * Description : Crée un nouveau rôle.
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Nouveau rôle créé.
 * @route POST /api/roles
 * @access Private
 * @example
 * // Exemple d'utilisation de la fonction
 * createNewRole(req, res);
 */
const createNewRole = async (req, res) => {
    try {
        const { role_label, role_description } = req.body;

        const role = await Role.create({
            role_label,
            role_description
        });

        res.status(201).json(role);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while creating role', error: error.message });
    }
}

/**
 * Nom de la fonction : deleteRole
 * Description : Supprime un rôle par son identifiant.
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Message indiquant la suppression réussie.
 * @route DELETE /api/roles/:id
 * @access Private
 * @example
 * // Exemple d'utilisation de la fonction
 * deleteRole(req, res);
 */
const deleteRole = async (req, res) => {
    try {
        const { id } = req.params;

        if( !id ){
            res.status(404).json({ message: 'ID NOT FOUND' });
        }

        const deletedRoleCount = await Role.destroy({
            where: {
                role_id: id
            }
        });

        if (deletedRoleCount === 0) {
            return res.status(404).json({ message: 'Role not found for the specified ID' });
        }

        res.json({ message: 'Role deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while deleting role', error: error.message });
    }
}

module.exports = {
    getAllRoles,
    getRoleById,
    createNewRole,
    deleteRole
}
