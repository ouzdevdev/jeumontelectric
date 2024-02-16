// role.controller.js
const { Role } = require('../models');

// @desc Get all roles
// @route GET /api/roles
// @access Private
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

// @desc Get role by id
// @route GET /api/roles/:id
// @access Private
const getRoleById = async (req, res) => {
    try {
        const { id } = req.params;

        const role = await Role.findOne({ where: { role_id: id } });

        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }

        res.json(role);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching role', error: error.message });
    }
}

// @desc Create new role
// @route POST /api/roles
// @access Private
const createNewRole = async (req, res) => {
    try {
        const { role_id, role_label, role_description } = req.body;

        const role = await Role.create({
            role_id,
            role_label,
            role_description
        });

        res.status(201).json(role);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while creating role', error: error.message });
    }
}

// @desc Delete a role
// @route DELETE /api/roles/:id
// @access Private
const deleteRole = async (req, res) => {
    try {
        const { id } = req.params;

        await Role.destroy({
            where: {
                role_id: id
            }
        });

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
