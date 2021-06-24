const express = require('express');
const router = express.Router();

// @route   GET Default Route
// @desc    Default Route
// @access  Public
router.get('/', async (req, res) => {
	res.status(200).send('Brew List Server - Nothing to see here!');
});

module.exports = router;
