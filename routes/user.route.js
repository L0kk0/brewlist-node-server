const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { createUser } = require('../controllers/user.controller');

// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public
router.post('/', createUser);

module.exports = router;
