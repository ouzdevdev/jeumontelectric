// emailService.js
const nodemailer = require('nodemailer');
const fs = require('fs');

/**
 * Fonction pour envoyer un rapport par e-mail.
 * @param {string} to - Adresse e-mail du destinataire.
 * @param {string} subject - Sujet de l'e-mail.
 * @param {string} templatePath - Chemin du modèle HTML de l'e-mail.
 * @param {Object} data - Données à insérer dans le modèle HTML.
 */
const sendRapport = (to, subject, templatePath, data) => {
    // Lecture du fichier de modèle HTML
    fs.readFile(templatePath, 'utf8', (err, template) => {
        if (err) {
            console.error('Erreur de lecture du modèle :', err);
            return;
        }

        // Création du transporteur pour l'e-mail
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_ACCOUNT,
                pass: process.env.MAIL_PASSWORD
            }
        });

        // Formatage du modèle avec les données
        const formattedTemplate = template
            .replace(/\${dateDebut}/g, data.dateDebut)
            .replace(/\${dateFin}/g, data.dateFin)
            .replace(/\${nbrTicketCreer}/g, data.nbrTicketCreer)
            .replace(/\${nbrTicketUpdate}/g, data.nbrTicketUpdate)
            .replace(/\${listeActions}/g, data.listeActions);

        // Options de l'e-mail
        const mailOptions = {
            from: process.env.MAIL_ACCOUNT,
            to,
            subject,
            html: formattedTemplate,
        };

        // Envoi de l'e-mail
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
            } else {
                console.log('E-mail envoyé :', info.response);
            }
        });
    });
}

/**
 * Fonction pour envoyer un e-mail contenant des informations de connexion à un nouvel utilisateur.
 * @param {string} to - Adresse e-mail du destinataire.
 * @param {string} subject - Sujet de l'e-mail.
 * @param {string} templatePath - Chemin du modèle HTML de l'e-mail.
 * @param {Object} data - Données à insérer dans le modèle HTML.
 */
const sendEmailConnexion = (to, subject, templatePath, data) => {
    // Lecture du fichier de modèle HTML
    fs.readFile(templatePath, 'utf8', (err, template) => {
        if (err) {
            console.error('Erreur de lecture du modèle :', err);
            return;
        }

        // Création du transporteur pour l'e-mail
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_ACCOUNT,
                pass: process.env.MAIL_PASSWORD
            }
        });

        // Formatage du modèle avec les données
        const formattedTemplate = template
            .replace(/\${user.user_name}/g, data.user_name)
            .replace(/\${user.user_password}/g, data.user_password)
            .replace(/\${user.user_email}/g, data.user_email);

        // Options de l'e-mail
        const mailOptions = {
            from: process.env.MAIL_ACCOUNT,
            to,
            subject,
            html: formattedTemplate,
        };

        // Envoi de l'e-mail
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
            } else {
                console.log('E-mail envoyé :', info.response);
            }
        });
    });
}

/**
 * Fonction pour envoyer un e-mail de planification au support.
 * @param {string} to - Adresse e-mail du destinataire.
 * @param {string} subject - Sujet de l'e-mail.
 * @param {string} templatePath - Chemin du modèle HTML de l'e-mail.
 * @param {Object} data - Données à insérer dans le modèle HTML.
 */
const sendEmailPlanifier = (to, subject, templatePath, data) => {
    // Lecture du fichier de modèle HTML
    fs.readFile(templatePath, 'utf8', (err, template) => {
        if (err) {
            console.error('Erreur de lecture du modèle :', err);
            return;
        }

        // Création du transporteur pour l'e-mail
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_ACCOUNT,
                pass: process.env.MAIL_PASSWORD
            }
        });

        // Formatage du modèle avec les données
        const formattedTemplate = template
            .replace(/\${user.user_name}/g, data.user_name)
            .replace(/\${week_id}/g, data.week_id)
            .replace(/\${year_id}/g, data.year_id);

        // Options de l'e-mail
        const mailOptions = {
            from: process.env.MAIL_ACCOUNT,
            to,
            subject,
            html: formattedTemplate,
        };

        // Envoi de l'e-mail
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
            } else {
                console.log('E-mail envoyé :', info.response);
            }
        });
    });
}

/**
 * Fonction générique pour envoyer n'importe quel e-mail.
 * @param {string} to - Adresse e-mail du destinataire.
 * @param {string} subject - Sujet de l'e-mail.
 * @param {string} templatePath - Chemin du modèle HTML de l'e-mail.
 * @param {Object} data - Données à insérer dans le modèle HTML.
 */
const sendEmail = (to, subject, templatePath, data) => {
    // Lecture du fichier de modèle HTML
    fs.readFile(templatePath, 'utf8', (err, template) => {
        if (err) {
            console.error('Erreur de lecture du modèle :', err);
            return;
        }

        // Création du transporteur pour l'e-mail
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_ACCOUNT,
                pass: process.env.MAIL_PASSWORD
            }
        });

        // Formatage du modèle avec les données
        const formattedTemplate = template.replace(/\${message}/g, data.message);

        // Options de l'e-mail
        const mailOptions = {
            from: process.env.MAIL_ACCOUNT,
            to,
            subject,
            html: formattedTemplate,
        };

        // Envoi de l'e-mail
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
            } else {
                console.log('E-mail envoyé :', info.response);
            }
        });
    });
};

/**
 * Fonction pour envoyer un e-mail avec des pièces jointes pour les commentaires.
 * @param {string} to - Adresse e-mail du destinataire.
 * @param {string} subject - Sujet de l'e-mail.
 * @param {string} templatePath - Chemin du modèle HTML de l'e-mail.
 * @param {Object} data - Données à insérer dans le modèle HTML.
 * @param {Object[]} attachment - Pièces jointes à inclure dans l'e-mail.
 */
const sendEmailWithAttachments  = (to, subject, templatePath, data, attachment) => {
    // Lecture du fichier de modèle HTML
    fs.readFile(templatePath, 'utf8', (err, template) => {
        if (err) {
            console.error('Erreur de lecture du modèle :', err);
            return;
        }

        // Création du transporteur pour l'e-mail
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_ACCOUNT,
                pass: process.env.MAIL_PASSWORD
            }
        });

        // Formatage du modèle avec les données
        const formattedTemplate = template.replace(/\${message}/g, data.message);

        // Options de l'e-mail
        const mailOptions = {
            from: process.env.MAIL_ACCOUNT,
            to,
            subject,
            html: formattedTemplate,
            attachments: attachment 
        };

        // Envoi de l'e-mail
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
            } else {
                console.log('E-mail envoyé :', info.response);
            }
        });
    });
};

// Exportation des fonctions
module.exports = {
    sendEmail,
    sendEmailWithAttachments,
    sendEmailPlanifier,
    sendEmailConnexion,
    sendRapport
};
