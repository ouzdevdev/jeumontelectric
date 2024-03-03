// verifyJwt.js
const jwt = require('jsonwebtoken')

/**
 * Middleware pour vérifier et valider le jeton JWT dans l'en-tête Authorization de la requête.
 * @param {Object} req - Requête HTTP entrante.
 * @param {Object} res - Réponse HTTP sortante.
 * @param {Function} next - Fonction pour passer au middleware suivant.
 */
const verifyJWT = (req, res, next) => {
    // Récupération de l'en-tête Authorization de la requête
    const authHeader = req.headers.authorization || req.headers.Authorization

    // Vérification de la présence et du format correct de l'en-tête Authorization
    if (!authHeader?.startsWith('Bearer ')) {
        // Si l'en-tête Authorization n'est pas présent ou ne commence pas par 'Bearer ', renvoie une réponse avec un code de statut 401 (Unauthorized)
        return res.status(401).json({ message: 'Non autorisé' })
    } 

    // Extrait le jeton JWT de l'en-tête Authorization
    const token = authHeader.split(' ')[1]

    // Vérification et validation du jeton JWT
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            // Si une erreur survient lors de la vérification du jeton JWT, renvoie une réponse avec un code de statut 403 (Forbidden)
            if(err) return res.status(403).json({ message: 'Interdit' })
            // Si le jeton JWT est valide, extrait et passe l'email et le rôle du décodeur dans la requête pour une utilisation ultérieure
            req.email = decoded.email;
            req.role = decoded.role;
            next(); // Passe au middleware suivant
        }
    )
}

module.exports = verifyJWT
