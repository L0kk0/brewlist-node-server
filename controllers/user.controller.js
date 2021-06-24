const bcrypt = require('bcryptjs');
const User = require('../models/User');

// @route   POST api/users
// @desc    Create User
// @access  Private - Admin
exports.createUser = async (req, res) => {
	const { email, password, registration } = req.body;

	if (!email) return res.status(400).json({ msg: 'Email Required' });
	if (!password) return res.status(400).json({ msg: 'Password Required' });
	if (!registration)
		return res.status(400).json({ msg: 'Registration Code Required' });

	const userFields = {};

	if (email) userFields.email = email;
	if (password) {
		const salt = await bcrypt.genSalt(10);
		userFields.password = await bcrypt.hash(password, salt);
	}

	try {
		let registrationToken;

		if (process.env.NODE_ENV === 'production') {
			registrationToken = process.env.REGISTRATION_TOKEN;
		} else {
			const config = require('config');
			registrationToken = config.get('REGISTRATION_TOKEN');
		}

		if (registration !== registrationToken) {
			throw new Error('Invalid Registration Token');
		}

		const existingUser = await User.findOne({ Email: userFields.email });

		if (existingUser) {
			throw new Error('Invalid Email');
		}

		const newUser = new User({
			Email: userFields.email,
			Password: userFields.password,
		});

		let user = await newUser.save();

		return res
			.status(200)
			.json({ msg: `User Created Successfully: ${user.Email}` });
	} catch (err) {
		console.log('Error:', err.message);
		return res.status(500).json({ msg: err.message });
	}
};
