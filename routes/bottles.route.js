const express = require('express');
const router = express.Router();
const { auth, authPour } = require('../middleware/auth');
const bottlesController = require('../controllers/bottles.controller');

// API Bottles Routes
router.get('/', bottlesController.getBottles);
router.post('/', auth, bottlesController.postBottles);
router.put('/:id', authPour, bottlesController.pourBottle);
router.put('/', auth, bottlesController.putBottles);
router.delete('/:id', auth, bottlesController.deleteBottles);

module.exports = router;
