// ship.controller.js
const { Ship, Fleet } = require('../models');

// @desc Get all ships
// @route GET /api/ships
// @access Private
const getAllShips = async (req, res) => {
    try {
        const ships = await Ship.findAll({
            // include: [
            //     {
            //         model: Fleet,
            //         attributes: { exclude: ['fleet_id'] }, // Exclude the 'fleet_id' field from the Fleet model
            //     },
            // ],
            // attributes: { exclude: ['fleet_id'] }, // Exclude the 'fleet_id' field from the Ship model
        });
        if (!ships.length) {
            return res.status(404).json({ message: 'No ships found' });
        }
        res.json(ships);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des navires.' });
    }
};

// @desc Get all ships
// @route GET /api/ships/fleet/:fleet_id
// @access Private
const getAllShipsByFleet = async (req, res) => {
    try {
        
        const { fleet_id } = req.params ;

        if ( !fleet_id ) {
            return res.status(400).json({ message: 'Fleet ID is required' });
        }

        const ships = await Ship.findAll({
            where: { fleet_id },
            // include: [
            //     {
            //         model: Fleet,
            //         attributes: { exclude: ['fleet_id'] }, // Exclude the 'fleet_id' field from the Fleet model
            //     },
            // ],
            // attributes: { exclude: ['fleet_id'] }, // Exclude the 'fleet_id' field from the Ship model
        });
        if (!ships.length) {
            return res.status(404).json({ message: 'No ships found' });
        }
        res.json(ships);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des navires.' });
    }
};

// @desc Get ship by id
// @route GET /api/ships/:id
// @access Private
const getShipById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Ship ID is required' });
        }

        const ship = await Ship.findOne({ where: { ship_uuid: id } });

        if (!ship) { // Use strict comparison to check for null
            return res.status(404).json({ message: 'Navire non trouvé' });
        }
        res.json(ship);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du navire.' });
    }
};

// @desc Create new ship
// @route POST /api/ships
// @access Private
const createNewShip = async (req, res) => {
    try {
        const { ship_name, fleet_id } = req.body;

        const ship = await Ship.create({
            ship_name,
            fleet_id,
        });
        res.json(ship);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la création d\'un navire.' });
    }
};

// @desc update ship
// @route PUT /api/ships/:id
// @access Private
const updateShip = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Ship ID is required' });
        }

        const { ship_name, fleet_id } = req.body;

        await Ship.update({ 
            ship_name,
            fleet_id,
        }, {
            where: { ship_uuid: id } 
        });

        res.status(201).json({
            message: 'Ship was updated',
            shipid: id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la madification d\'un bateau.' });
    }
};

// @desc Delete a ship
// @route DELETE /api/ships/:id
// @access Private
const deleteShip = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Ship ID is required' });
        }

        await Ship.destroy({
            where: {
                ship_uuid: id,
            },
        });
        res.json({
            message: 'Navire supprimé avec succès.',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du navire.' });
    }
};

module.exports = {
    getAllShips,
    getShipById,
    createNewShip,
    updateShip,
    deleteShip,
    getAllShipsByFleet,
};
