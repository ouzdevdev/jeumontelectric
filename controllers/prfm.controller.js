const { Op } = require('sequelize');
const logger = require('../middlewares/logger');
const { PRFM } = require('../models');

// Récupérer toutes les demandes PRFM
// GET /api/prfm
// Accès : Privé
const getAllPRFM = async (req, res) => {
  try {
    const prfmList = await PRFM.findAll();

    if (!prfmList.length) {
      return res.status(404).json({ message: 'No PRFM found' });
    }

    res.json(prfmList);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching PRFM list', error: error.message });
  }
};

// Récupérer une demande PRFM par son ID
// GET /api/prfm/:id
// Accès : Privé
const getPRFMById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'PRFM ID is required' });
    }
    const prfmItem = await PRFM.findOne({ where: { asked_uuid: id } });
    if (!prfmItem) {
      return res.status(404).json({ message: 'PRFM not found' });
    }
    res.json(prfmItem);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching PRFM item', error: error.message });
  }
};

// Créer une demande PRFM
// POST /api/prfm
// Accès : Privé
const createPRFM = async (req, res) => {
  try {
    const {
      asked_description,
      asked_ref,
      status_id,
      ship_uuid,
      skill_id,
      level_id,
      prfm_document,
    } = req.body;

    const newPRFM = await PRFM.create({
        asked_description,
        asked_ref,
        status_id,
        ship_uuid,
        skill_id,
        level_id,
        prfm_document,
    });
  
    
    res.status(201).json(newPRFM);

  } catch (error) {
    res.status(500).json({ message: 'Error creating PRFM', error: error.message });
  }
};

// Mettre à jour une demande PRFM par son ID
// PUT /api/prfm/:id
// Accès : Privé
const updatePRFM = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'PRFM ID is required' });
    }

    const prfmItem = await PRFM.findOne({ where: { asked_uuid: id } });
    if (!prfmItem) {
      return res.status(404).json({ message: 'PRFM not found' });
    }

    const {
      asked_description,
      asked_ref,
      status_id,
      ship_uuid,
      skill_id,
      level_id,
      prfm_document,
    } = req.body;

    await prfmItem.update({
      asked_description,
      asked_ref,
      status_id,
      ship_uuid,
      skill_id,
      level_id,
      prfm_document,
    });

    res.json({ message: 'PRFM updated successfully', updatedPRFM: prfmItem });
  } catch (error) {
    res.status(500).json({ message: 'Error updating PRFM', error: error.message });
  }
};

// Supprimer une demande PRFM par son ID
// DELETE /api/prfm/:id
// Accès : Privé
const deletePRFM = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'PRFM ID is required' });
    }
    const deletedCount = await PRFM.destroy({ where: { asked_uuid: id } });
    if (!deletedCount) {
      return res.status(404).json({ message: 'PRFM not found' });
    }
    res.json({ message: 'PRFM deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting PRFM', error: error.message });
  }
};

module.exports = {
  getAllPRFM,
  getPRFMById,
  createPRFM,
  updatePRFM,
  deletePRFM,
};
