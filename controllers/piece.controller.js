// piece.controller.js
const { Piece } = require('../models');

/**
 * Récupère toutes les pièces.
 * @route GET /api/pieces
 * @access Private
 * @returns {Object} - Les pièces récupérées.
 * @throws {Error} - Une erreur si la récupération des pièces échoue.
 * @example
 * // Exemple d'appel de la fonction
 * getAllPieces(req, res);
 */
const getAllPieces = async (req, res) => {
    try {
        const pieces = await Piece.findAll();

        if (!pieces.length) {
            return res.status(404).json({ message: 'No pieces found' });
        }

        res.json(pieces);
    } catch (error) {
        res.status(500).json({ 
            message: error.message,
            error
        });
    }
};

/**
 * Récupère une pièce par son ID.
 * @route GET /api/pieces/:piece_uuid
 * @access Private
 * @param {string} piece_uuid - L'UUID de la pièce à récupérer.
 * @returns {Object} - La pièce trouvée.
 * @throws {Error} - Une erreur si la récupération de la pièce échoue.
 * @example
 * // Exemple d'appel de la fonction
 * findPieceById(req, res);
 */
const findPieceById = async (req, res) => {
    try {
        const { piece_uuid } = req.params;

        const piece = await Piece.findOne({
            where: {
                piece_uuid: piece_uuid
            }
        })

        res.json(piece);
    } catch (error) {
        res.status(500).json({ 
            message: error.message,
            error
        });
    }
};

module.exports = {
    getAllPieces,
    findPieceById
};
