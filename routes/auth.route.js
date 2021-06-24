const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { getUser, authUser } = require('../controllers/auth.controller');

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', auth, getUser);

// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public
router.post('/', authUser);

module.exports = router;
