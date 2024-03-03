// ship.controller.js
const { Ship, Fleet, Customer, User } = require('../models');

/**
 * @desc Récupère tous les navires.
 * @route GET /api/ships
 * @access Private
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Liste des navires trouvés.
 */
const getAllShips = async (req, res) => {
    try {

        const ships = await Ship.findAll({
            where: {
                data_active: true
            },
            include: [
                {
                    model: Fleet,
                    include: [
                        {
                            model: Customer,
                        },
                    ],            
                    attributes: { exclude: ['customer_uuid'] }, 
                },
            ],
            attributes: { exclude: ['fleet_id'] },
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

/**
 * @desc Récupère tous les navires par flotte.
 * @route GET /api/ships/fleet/:fleet_id
 * @access Private
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Liste des navires trouvés pour une flotte spécifiée.
 */
const getAllShipsByFleet = async (req, res) => {
    try {
        
        const { fleet_id } = req.params ;

        if ( !fleet_id ) {
            return res.status(400).json({ message: 'Fleet ID is required' });
        }

        const ships = await Ship.findAll({
            where: { 
                fleet_id 
            }
        });
        
        res.json(ships);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des navires.' });
    }
};

/**
 * @desc Récupère tous les navires par client.
 * @route GET /api/ships/customer/:cust_uuid
 * @access Private
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Liste des navires trouvés pour un client spécifié.
 */
const getAllShipsByCustomer = async (req, res) => {
    try {
        const { cust_uuid } = req.params;

        if (!cust_uuid) {
            return res.status(400).json({ message: 'Customer ID is required' });
        }

        const ships = await Ship.findAll({
            include: [
                {
                    model: Fleet,
                },
            ],
            where: { 
                '$Fleet.customer_uuid$': cust_uuid, 
            },
            attributes: { exclude: ['fleet_id'] }, 
        });
        
        if (!ships.length) {
            return res.status(404).json({ message: 'No ships found' });
        }
        
        res.json(ships);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while retrieving ships.' });
    }
};

/**
 * @desc Récupère tous les navires par utilisateur.
 * @route GET /api/ships/user/:user_uuid
 * @access Private
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Liste des navires trouvés pour un utilisateur spécifié.
 */
const getAllShipsByUser = async (req, res) => {
    try {
        const { user_uuid } = req.params;

        if (!user_uuid) {
            return res.status(400).json({ message: 'Customer ID is required' });
        }

        const ships = await Ship.findAll({
            include: [
                {
                    model: Fleet,
                },
                {
                    model: User,
                }
            ],
            where: { 
                user_uuid: user_uuid, 
            },
            attributes: { exclude: ['fleet_id'] }, 
        });
        
        if (!ships.length) {
            return res.status(404).json({ message: 'No ships found' });
        }
        
        res.json(ships);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while retrieving ships.' });
    }
};

/**
 * @desc Récupère un navire par son identifiant.
 * @route GET /api/ships/:id
 * @access Private
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Navire trouvé.
 */
const getShipById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Ship ID is required' });
        }

        const ship = await Ship.findOne({ where: { ship_uuid: id } });

        if ( !ship ) { 
            return res.status(404).json({ message: 'Navire non trouvé' });
        }
        res.json(ship);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du navire.' });
    }
};

/**
 * @desc Crée un nouveau navire.
 * @route POST /api/ships
 * @access Private
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Nouveau navire créé.
 */
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

/**
 * @desc Met à jour un navire.
 * @route PUT /api/ships/:id
 * @access Private
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Message indiquant la mise à jour réussie du navire.
 */
const updateShip = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Ship ID is required' });
        }

        const { ship_name, ship_description } = req.body;

        await Ship.update({ 
            ship_name,
            ship_description
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

/**
 * @desc Supprime un navire par son identifiant.
 * @route DELETE /api/ships/:id
 * @access Private
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Message indiquant la suppression réussie du navire.
 */
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

        res.json({ message: 'Navire supprimé avec succès.' });
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
    getAllShipsByUser,
    getAllShipsByCustomer,
};
