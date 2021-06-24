const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settings.controller');

// API Fermentable Routes
router.get('/', settingsController.get);
router.put('/', settingsController.put);

module.exports = router;
