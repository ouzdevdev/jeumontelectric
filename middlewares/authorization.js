// authorization.js
const jwt = require('jsonwebtoken')

/**
 * Autorise les utilisateurs ayant des rôles spécifiques à accéder à un chemin.
 * @param {Array} allowedRoles - Les rôles autorisés à accéder au chemin.
 * @returns {Function} - Middleware pour l'autorisation.
 */
function authorize(allowedRoles) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    const token = authHeader?.split(' ')[1]

    const userRole = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET).role
    
    if (allowedRoles.includes(userRole)) {
      next();
    } else {
      res.status(403).json({ error: 'Forbidden' });
      
    }
  };
}

module.exports = { authorize };