// logMiddleware.js
const logger = require('./logger');

/**
 * Middleware pour enregistrer toutes les requêtes entrantes.
 * @param {Object} req - Requête HTTP entrante.
 * @param {Object} res - Réponse HTTP sortante.
 * @param {Function} next - Fonction pour passer au middleware suivant.
 */
const logIncomingRequests = (req, res, next) => {
  // Enregistre un message de journal indiquant la requête entrante avec sa méthode et son URL
  logger.info(`Requête ${req.method} reçue à ${req.originalUrl}`);
  next(); // Passe au middleware suivant
};

/**
 * Middleware pour enregistrer toutes les réponses sortantes.
 * @param {Object} req - Requête HTTP entrante.
 * @param {Object} res - Réponse HTTP sortante.
 * @param {Function} next - Fonction pour passer au middleware suivant.
 */
const logOutgoingResponses = (req, res, next) => {
  // Enregistre un message de journal indiquant la réponse sortante avec son code de statut et son URL
  res.on('finish', () => {
    logger.info(`Réponse ${res.statusCode} envoyée pour la requête ${req.method} à ${req.originalUrl}`);
  });
  next(); // Passe au middleware suivant
};

/**
 * Middleware pour gérer les erreurs.
 * @param {Error} err - Erreur survenue.
 * @param {Object} req - Requête HTTP entrante.
 * @param {Object} res - Réponse HTTP sortante.
 * @param {Function} next - Fonction pour passer au middleware suivant.
 */
const errorHandler = (err, req, res, next) => {
  // Enregistre un message de journal indiquant l'erreur survenue
  logger.error(`Une erreur s'est produite : ${err.message}`);
  // Envoie une réponse avec un code de statut 500 en cas d'erreur interne du serveur
  res.status(500).json({ error: 'Erreur interne du serveur' });
};

module.exports = {
  logIncomingRequests,
  logOutgoingResponses,
  errorHandler,
};
