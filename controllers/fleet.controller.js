// fleet.controller.js
const { Fleet } = require('../models');

/**
 * Récupérer toutes les flottes sans les UUID des clients associés.
 * @route GET /api/fleets
 * @access Privé
 * @returns {Object} - Les flottes récupérées.
 * @throws {Error} - Une erreur si la récupération des flottes échoue.
 * @example
 * // Exemple d'appel de la fonction
 * getAllFleets(req, res);
 */
const getAllFleets = async (req, res) => {
    try {
        const fleets = await Fleet.findAll({
            attributes: { 
                exclude: ['customer_uuid'] 
            }
        });
        
        if (!fleets.length) {
            return res.status(404).json({ 
                message: 'No fleets found' 
            });
        }
        
        res.json(fleets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: 'An error occurred while fetching fleets', 
            error: error.message 
        });
    }
}

/**
 * Récupérer toutes les flottes associées à un client spécifique sans les UUID des clients associés.
 * @route GET /api/fleets/customer/:cust_id
 * @access Privé
 * @param {string} cust_uuid - L'UUID du client pour lequel récupérer les flottes associées.
 * @returns {Object} - Les flottes associées au client spécifié.
 * @throws {Error} - Une erreur si la récupération des flottes échoue.
 * @example
 * // Exemple d'appel de la fonction
 * getAllFleetsByCustomer(req, res);
 */
const getAllFleetsByCustomer = async (req, res) => {
    try {
        const { cust_uuid } = req.params;

        if (!cust_uuid) {
            return res.status(400).json({ message: 'Customer ID is required' });
        }

        const fleets = await Fleet.findAll({
            where: { customer_uuid: cust_uuid },
            attributes: { exclude: ['customer_uuid'] },
        });
        
        res.json(fleets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching fleets', error: error.message });
    }
}

/**
 * Récupérer une flotte par son ID sans l'UUID du client associé.
 * @route GET /api/fleets/:id
 * @access Privé
 * @param {string} id - L'ID de la flotte à récupérer.
 * @returns {Object} - La flotte trouvée.
 * @throws {Error} - Une erreur si la récupération de la flotte échoue.
 * @example
 * // Exemple d'appel de la fonction
 * getFleetById(req, res);
 */
const getFleetById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Fleet ID is required' });
        }

        const fleet = await Fleet.findOne({ 
            where: { fleet_id: id },
            attributes: { exclude: ['customer_uuid'] },
        });
        if (!fleet) {
            return res.status(404).json({ message: 'Fleet not found' });
        }
        res.json(fleet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching fleet', error: error.message });
    }
}

/**
 * Créer une nouvelle flotte.
 * @route POST /api/fleets
 * @access Privé
 * @param {string} fleet_name - Le nom de la flotte à créer.
 * @param {string} fleet_description - La description de la flotte à créer.
 * @param {string} customer_uuid - L'UUID du client associé à la flotte à créer.
 * @returns {Object} - La flotte créée.
 * @throws {Error} - Une erreur si la création de la flotte échoue.
 * @example
 * // Exemple d'appel de la fonction
 * createNewFleet(req, res);
 */
const createNewFleet = async (req, res) => {
    try {   
        const { 
            fleet_name, 
            fleet_description, 
            customer_uuid 
        } = req.body;

        const fleet = await Fleet.create({
            fleet_name, fleet_description, customer_uuid
        });
        res.status(201).json(fleet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while creating fleet', error: error.message });
    }
}

/**
 * Mettre à jour une flotte.
 * @route POST /api/fleets/:id
 * @access Privé
 * @param {string} id - L'ID de la flotte à mettre à jour.
 * @param {string} fleet_name - Le nouveau nom de la flotte.
 * @param {string} fleet_description - La nouvelle description de la flotte.
 * @param {string} customer_uuid - Le nouvel UUID du client associé à la flotte.
 * @returns {Object} - Un message confirmant que la flotte a été mise à jour.
 * @throws {Error} - Une erreur si la mise à jour de la flotte échoue.
 * @example
 * // Exemple d'appel de la fonction
 * updateFleet(req, res);
 */
const updateFleet = async (req, res) => {
    try {   
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Fleet ID is required' });
        }

        const { 
            fleet_name, 
            fleet_description, 
            customer_uuid 
        } = req.body;

        await Fleet.update({ 
            fleet_name, 
            fleet_description, 
            customer_uuid
        }, {
            where: { fleet_id: id } 
        });

        res.status(201).json({
            message: 'Fleet was updated',
            fleetid: id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating fleet', error: error.message });
    }
}

/**
 * Supprimer une flotte par son ID.
 * @route DELETE /api/fleets/:id
 * @access Privé
 * @param {string} id - L'ID de la flotte à supprimer.
 * @returns {Object} - Un message confirmant que la flotte a été supprimée avec succès.
 * @throws {Error} - Une erreur si la suppression de la flotte échoue.
 * @example
 * // Exemple d'appel de la fonction
 * deleteFleet(req, res);
 */
const deleteFleet = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Fleet ID is required' });
        }

        await Fleet.destroy({
            where: {
                fleet_id: id
            }
        });
        res.json({ message: 'Fleet deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while deleting fleet', error: error.message });
    }
}

module.exports = {
    getAllFleets,
    getAllFleetsByCustomer,
    getFleetById,
    createNewFleet,
    updateFleet,
    deleteFleet
}
