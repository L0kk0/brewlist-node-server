const express = require('express');
const router = express.Router();
const { auth, authPour } = require('../middleware/auth');
const tapsController = require('../controllers/taps.controller');

// API Taps Routes
router.get('/', tapsController.getTaps);
router.post('/', auth, tapsController.postTaps);
router.put('/:id/:amt', authPour, tapsController.pourTap);
router.put('/', auth, tapsController.putTaps);
router.delete('/:id', auth, tapsController.deleteTaps);

module.exports = router;
