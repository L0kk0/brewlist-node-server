const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const brewFatherController = require('../controllers/brewfather.controller');

// API Brewfather Routes
router.get('/', brewFatherController.getBatches);
router.get('/:id', brewFatherController.getBatch);

module.exports = router;
