// fleet.controller.js
const { Fleet, Customer } = require('../models');

// Récupérer toutes les flottes avec leurs clients associés
// GET /api/fleets
// Accès : Privé
const getAllFleets = async (req, res) => {
    try {
        const fleets = await Fleet.findAll({
            // include: [
            //     {
            //         model: Customer,
            //         attributes: { exclude: ['customer_uuid'] },
            //     },
            // ],
            attributes: { exclude: ['customer_uuid'] },
        });
        
        if (!fleets.length) {
            return res.status(404).json({ message: 'No fleets found' });
        }
        
        res.json(fleets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching fleets', error: error.message });
    }
}

// Récupérer toutes les flottes avec leurs clients associés
// GET /api/fleets/customer/:cust_id
// Accès : Privé
const getAllFleetsByCustomer = async (req, res) => {
    try {
        const { cust_uuid } = req.params;

        if (!cust_uuid) {
            return res.status(400).json({ message: 'Customer ID is required' });
        }

        const fleets = await Fleet.findAll({
            
            where: { customer_uuid: cust_uuid },
            // include: [
            //     {
            //         model: Customer,
            //         attributes: { exclude: ['customer_uuid'] },
            //     },
            // ],
            attributes: { exclude: ['customer_uuid'] },
        });
        
        if (!fleets.length) {
            return res.status(404).json({ message: 'No fleets found' });
        }
        
        res.json(fleets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching fleets', error: error.message });
    }
}

// Récupérer une flotte par son ID
// GET /api/fleets/:id
// Accès : Privé
const getFleetById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Fleet ID is required' });
        }

        const fleet = await Fleet.findOne({ 
            where: { fleet_id: id },
            // include: [
            //     {
            //         model: Customer,
            //         attributes: { exclude: ['customer_uuid'] },
            //     },
            // ],
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

// Créer une nouvelle flotte
// POST /api/fleets
// Accès : Privé
const createNewFleet = async (req, res) => {
    try {   
        const { 
            fleet_id, 
            fleet_name, 
            fleet_description, 
            customer_uuid 
        } = req.body;

        const fleet = await Fleet.create({
            fleet_id, fleet_name, fleet_description, customer_uuid
        });
        res.status(201).json(fleet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while creating fleet', error: error.message });
    }
}

// Créer une nouvelle flotte
// POST /api/fleets
// Accès : Privé
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
        res.status(500).json({ message: 'An error occurred while creating fleet', error: error.message });
    }
}

// Supprimer une flotte par son ID
// DELETE /api/fleets/:id
// Accès : Privé
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
