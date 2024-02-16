// customer.controller.js
const { Op } = require('sequelize');
const logger = require('../middlewares/logger');
const { Customer } = require('../models');

// Récupérer tous les clients
// GET /api/customers
// Accès : Privé
const getAllCustomers = async (req, res) => {
    try {
        const { name } = req.query;
        logger.info(name);
        const customers = await Customer.findAll({
            where: name ? { customer_name: { [Op.iLike]: `%${name}%` } } : {},
        });

        if (!customers.length) {
            return res.status(404).json({ message: 'No customers found' });
        }
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching customers', error: error.message });
    }
}

// Récupérer un client par son ID
// GET /api/customers/:id
// Accès : Privé
const getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Customer ID is required' });
        }
        const customer = await Customer.findOne({ where: { customer_uuid: id } });
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json(customer);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching customer', error: error.message });
    }
}

// Créer un nouveau client
// POST /api/customers
// Accès : Privé
const createNewCustomer = async (req, res) => {
    try {
        const { 
            customer_ref, 
            customer_name, 
            customer_date, 
            customer_description, 
            customer_siret
        } = req.body;
    
        const customer = await Customer.create({
            customer_ref, 
            customer_name, 
            customer_date, 
            customer_description, 
            customer_siret
        });
    
        res.status(201).json(customer);
    } catch (error) {
        res.status(400).json({ message: 'Invalid customer data received', error: error.message });
    }
}

// Supprimer un client par son ID
// DELETE /api/customers/:id
// Accès : Privé
const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
          return res.status(400).json({ message: 'Customer ID is required' });
        }
        const deletedCount = await Customer.destroy({ where: { customer_uuid: id } });
        if (!deletedCount) {
          return res.status(404).json({ message: 'Customer not found' });
        }
        res.json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting customer', error: error.message });
    }
}

// Modifier un client
// POST /api/customers/:id
// Accès : Privé
const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
          return res.status(400).json({ message: 'Customer ID is required' });
        }

        const { 
            customer_ref, 
            customer_name, 
            customer_date, 
            customer_description, 
            customer_siret
        } = req.body;

        Customer.update({ 
            customer_ref, 
            customer_name, 
            customer_date, 
            customer_description, 
            customer_siret
        }, {
            where: { customer_uuid: id } 
        });
    
        res.status(201).json({
            message: 'Customer was updated',
            customerid: id
        });
    } catch (error) {
        res.status(400).json({ message: 'Invalid customer data received', error: error.message });
    }
}

module.exports = {
    getAllCustomers,
    getCustomerById,
    deleteCustomer,
    createNewCustomer,
    updateCustomer,
}
