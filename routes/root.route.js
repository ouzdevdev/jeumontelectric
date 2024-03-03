const express = require('express');
const router = express.Router();
const path = require('path');

// Définition de la route pour servir index.html
router.get('^/$|/index(.html)?', (req, res) => {
    // Envoi du fichier index.html situé dans le dossier views
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

module.exports = router;
