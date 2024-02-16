const { Op } = require('sequelize');
const logger = require('../middlewares/logger');
const { Asked } = require('../models');

// Récupérer toutes les demandes génériques
// GET /api/asked
// Accès : Privé
const getAllAsked = async (req, res) => {
    try {
        // const { asked_description } = req.query;
        
        // logger.info(asked_description);
        const askedList = await Asked.findAll({

        });
            // where: asked_description ? { asked_description: { [Op.iLike]: `%${asked_description}%` } } : {},
        // });

        if (!askedList.length) {
            return res.status(404).json({ message: 'No asked found' });
        }
        
        res.json(askedList);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching asked list', error: error.message });
    }
}

// Récupérer une demande générique par son ID
// GET /api/asked/:id
// Accès : Privé
const getAskedById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Asked ID is required' });
        }
        const askedItem = await Asked.findOne({ where: { asked_uuid: id } });
        if (!askedItem) {
            return res.status(404).json({ message: 'Asked not found' });
        }
        res.json(askedItem);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching asked item', error: error.message });
    }
}

// Créer une demande PRFM
// POST /api/prfm
// Accès : Privé
const createAsked = async (req, res) => {
    try {
      const {
        asked_description,
        asked_ref,
        status_id,
        ship_uuid,
        skill_id,
        level_id,
      } = req.body;
  
      const newAsked = await Asked.create({
          asked_description,
          asked_ref,
          status_id,
          ship_uuid,
          skill_id,
          level_id,
      });
    
      
      res.status(201).json(newAsked);
  
    } catch (error) {
      res.status(500).json({ message: 'Error creating Asked', error: error.message });
    }
  };

// Supprimer une demande générique par son ID
// DELETE /api/asked/:id
// Accès : Privé
const deleteAsked = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
          return res.status(400).json({ message: 'Asked ID is required' });
        }
        const deletedCount = await Asked.destroy({ where: { asked_uuid: id } });
        if (!deletedCount) {
          return res.status(404).json({ message: 'Asked not found' });
        }
        res.json({ message: 'Asked deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting asked', error: error.message });
    }
}

// Supprimer tous les demandes
// DELETE /api/asked/delete
// Accès : Privé
const deleteAll = async (req, res) => {
    try {
        // Delete all records from the 'YourModel' table.
        await Asked.destroy({
          where: {}, // Empty 'where' object will match all records in the table
          truncate: true, // This will reset the auto-increment ID column if applicable
        });
    
        res.status(200).json({ message: 'All records deleted successfully.' });
    } catch (error) {
        console.error('Error deleting records:', error);
        res.status(500).json({ error: 'Something went wrong.' });
    }
}

module.exports = {
    getAllAsked,
    getAskedById,
    deleteAsked,
    deleteAll,
    createAsked
}
