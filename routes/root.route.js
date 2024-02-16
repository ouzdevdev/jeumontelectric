const express = require('express');
const router = express.Router();
const path = require('path');

// Handles GET requests for paths matching '^/$' or '/index.html' (and its variations)
router.get('^/$|/index(.html)?', (req, res) => {
    // Send the 'index.html' file located in the 'views' directory
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

module.exports = router;
