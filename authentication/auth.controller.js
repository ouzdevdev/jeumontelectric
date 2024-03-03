// auth.controller.js
const passport = require("passport");
const { User } = require("../models");
const path = require('path');
const { sendEmail } = require('../utils/emailService');
const jwt = require("jsonwebtoken");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require('crypto');
const logger = require("../middlewares/logger");

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

/**
 * Configure la stratégie d'authentification locale avec Passport.
 * @param {String} email - L'email de l'utilisateur.
 * @param {String} password - Le mot de passe de l'utilisateur.
 * @param {Function} done - Callback à appeler une fois l'authentification terminée.
 * @returns {Function} - Fonction de stratégie d'authentification locale.
 */
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { user_email: email } });
        
        if ( !user ) {
          return done(null, false, { message: "Invalid email" });
        }

        if ( password !== user.user_password ) {
          return done(null, false, { message: 'Invalid email or password' });
        }

        if ( !user.user_active ) {
          return done(null, false, { message: 'This user is deactivated' });
        }
        
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);


/**
 * Connecte un utilisateur en utilisant Passport et génère un jeton d'accès JWT.
 * @route POST /api/auth/login
 * @access Public
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @param {Function} next - Middleware suivant dans la chaîne.
 * @returns {Object} - Jetons d'accès et de rafraîchissement.
 */
exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }

      const accessToken = jwt.sign(
        {
          id: user.user_uuid,
          email: user.user_email,
          role: user.role_id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "7d" }
      );

      const refreshToken = jwt.sign(
        {
          id: user.user_uuid,
          email: user.user_email,
          role: user.role_id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "30d" }
      );

      res.json({ accessToken, refreshToken });
    });
  })(req, res, next);
};

function generateRandomPassword() {
  return crypto.randomBytes(8).toString('hex'); // Generate an 8-character random hex string
}

/**
 * Génère un mot de passe aléatoire, met à jour le mot de passe de l'utilisateur et envoie un email avec le nouveau mot de passe.
 * @route POST /api/auth/forget
 * @access Public
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Message de succès ou d'erreur.
 */
exports.forget = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { user_email: email } });

    if ( !user ) {
      return res.status(400).json({ message: 'User not found' });
    }

    const newPassword = generateRandomPassword();

    logger.info(newPassword);

    user.user_password = newPassword;
    await user.save();
    const emailData = {
      message: `Password : ${newPassword}`,
    };

    const templatePath = path.join(__dirname, '..', 'public', 'mail', 'mailtoJeumont.html');

    sendEmail(email, `New password`, templatePath, emailData);

    res.json({
      message: 'Password updated'
    });

  } catch (error) {
    res.status(500).json({ 
        message: error.message, 
        error: error 
    });
  }

}

/**
 * Rafraîchit le jeton d'accès JWT à partir du jeton de rafraîchissement.
 * @route POST /api/auth/refresh
 * @access Public
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @returns {Object} - Nouveau jeton d'accès JWT.
 */
exports.refresh = (req, res) => {
  try {
    const { refreshToken } = req.body;
  
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          return res.status(403).json({ error: "Forbidden" });
        }
  
        try {
          const foundUser = await User.findOne({ where: { user_email: decoded.email } });
          if (!foundUser) {
            return res.status(401).json({ error: "Unauthorized" });
          }
  
          const accessToken = jwt.sign(
            {
              id: foundUser.user_uuid,
              email: foundUser.user_email,
              role: foundUser.role_id,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "7d" }
          );
  
          res.json({ accessToken });
        } catch (error) {
          return res.status(500).json({ error: "Internal Server Error" });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ 
      message: error.message, 
      error: error 
    });
  }
};
