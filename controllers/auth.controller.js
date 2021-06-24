const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
exports.getUser = async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-Password');
		res.json(user);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server Error');
	}
};

// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public
exports.authUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		let user = await User.findOne({ Email: email }).select('+Password');

		if (!user) {
			return res.status(401).json({ msg: 'Invalid Credentials' });
		}

		if (user.Password === '') {
			return res.status(401).json({ msg: 'Invalid Credentials' });
		}

		const isMatch = await bcrypt.compare(password, user.Password);

		if (!isMatch) {
			return res.status(400).json({ msg: 'Invalid Credentials' });
		}

		const payload = {
			user: {
				id: user.id,
			},
		};

		let jwtSecret;

		if (process.env.NODE_ENV === 'production') {
			jwtSecret = process.env.JWT_SECRET;
		} else {
			config = require('config');
			jwtSecret = config.get('JWT_SECRET');
		}

		jwt.sign(
			payload,
			jwtSecret,
			{
				expiresIn: 3600000,
			},
			async (err, token) => {
				if (err) throw err;
				res.json({ token });
			}
		);
	} catch (err) {
		console.error(err.message);
		return res.status(500).json({ msg: 'Server Error' });
	}
};
