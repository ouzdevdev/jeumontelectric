// customer.controller.js
const { Op } = require('sequelize');
const { Customer } = require('../models');

/**
* Nom de la fonction : getAllCustomers
* Description : Récupère tous les clients.
* @param {String} name - Nom du client (facultatif).
* @returns {Object} - Un tableau contenant tous les clients correspondants aux critères de recherche.
* @throws {Error} - Erreur si la récupération des clients échoue.
* @example
* // Exemple d'appel de la fonction
* getAllCustomers({ name: 'nom_client' });
*/
const getAllCustomers = async (req, res) => {
    try {
        const { name } = req.query;
        
        const customers = await Customer.findAll({
            where: name ? { customer_name: { [Op.iLike]: `%${name}%` }, data_active: true } : {} // Filtrer par nom de client (insensible à la casse) si fourni
        });

        if (!customers.length) {
            return res.status(404).json({ message: 'No customers found' });
        }
        res.json(customers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching customers', error: error.message });
    }
}

/**
* Nom de la fonction : getCustomerById
* Description : Récupère un client par son ID.
* @param {String} id - L'ID du client à récupérer.
* @returns {Object} - Le client correspondant à l'ID spécifié.
* @throws {Error} - Erreur si la récupération du client échoue.
* @example
* // Exemple d'appel de la fonction
* getCustomerById('customer_id');
*/
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

/**
* Nom de la fonction : createNewCustomer
* Description : Crée un nouveau client.
* @param {String} customer_ref - Référence du client.
* @param {String} customer_name - Nom du client.
* @param {Date} customer_date - Date du client.
* @param {String} customer_description - Description du client.
* @param {String} customer_siret - Numéro SIRET du client.
* @returns {Object} - Le client nouvellement créé.
* @throws {Error} - Erreur si la création du client échoue.
* @example
* // Exemple d'appel de la fonction
* createNewCustomer({ customer_ref: 'ref_client', customer_name: 'nom_client', customer_date: '2022-02-28', customer_description: 'description_client', customer_siret: '123456789' });
*/
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

/**
* Nom de la fonction : deleteCustomer
* Description : Supprime un client par son ID.
* @param {String} id - L'ID du client à supprimer.
* @returns {Object} - Un message indiquant que le client a été supprimé avec succès.
* @throws {Error} - Erreur si la suppression du client échoue.
* @example
* // Exemple d'appel de la fonction
* deleteCustomer('customer_id');
*/
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

/**
* Nom de la fonction : updateCustomer
* Description : Met à jour un client.
* @param {String} id - L'ID du client à mettre à jour.
* @param {String} customer_ref - Référence du client.
* @param {String} customer_name - Nom du client.
* @param {Date} customer_date - Date du client.
* @param {String} customer_description - Description du client.
* @param {String} customer_siret - Numéro SIRET du client.
* @returns {Object} - Un message indiquant que le client a été mis à jour avec succès.
* @throws {Error} - Erreur si la mise à jour du client échoue.
* @example
* // Exemple d'appel de la fonction
* updateCustomer('customer_id', { customer_ref: 'ref_client', customer_name: 'nom_client', customer_date: '2022-02-28', customer_description: 'description_client', customer_siret: '123456789' });
*/
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

        // Met à jour le client avec les nouvelles données
        await Customer.update({ 
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
