// customerProject.controller.js

const { CustomerProject } = require('../models');

// Récupérer tous les clients-projets
// GET /api/customerpj
// Accès : Privé
const getAllCustomers = async (req, res) => {
    try {
        const customers = await CustomerProject.findAll();
        if (!customers.length) {
            return res.status(404).json({ message: 'No customers-projects found' });
        }
        res.json(customers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching customers-projects' });
    }
};

// Récupérer un client-projet par son ID de projet et d'équipage
// GET /api/customerpj/:idProjet/:idShip
// Accès : Privé
const getCustomerById = async (req, res) => {
    try {
        const { idProjet, idShip } = req.params;

        const customer = await CustomerProject.findOne({
        where: {
            project_uuid: idProjet, 
            ship_uuid: idShip
        } 
        });

        if (!customer) {
            return res.status(404).json({ message: 'Customer-Project not found' });
        } else {
            res.json(customer);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching the customer-project' });
    }
};

// Créer un nouveau client-projet
// POST /api/customerpj
// Accès : Privé
const createNewCustomer = async (req, res) => {
    try {
        const { project_uuid, ship_uuid } = req.body;

        const customer = await Customer.CustomerProject({ project_uuid, ship_uuid });

        res.status(201).json(customer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while creating the customer-project' });
    }
};

// Supprimer un client-projet par son ID de projet et d'équipage
// DELETE /api/customerpj/:idProjet/:idShip
// Accès : Privé
const deleteCustomer = async (req, res) => {
    try {
        const { idShip, idProjet } = req.params;

        const deletedCount = await Customer.CustomerProject({
        where: {
            project_uuid: idProjet, 
            ship_uuid: idShip
        }
        });

        if (!deletedCount) {
           return res.status(404).json({ message: 'Customer-Project not found' });
        }

        res.json({ message: 'Customer-Project deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while deleting the customer-project' });
    }
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  deleteCustomer,
  createNewCustomer,
};
