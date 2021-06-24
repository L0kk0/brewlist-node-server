const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const dns = require('dns');

let jwtSecret;
let dynDns;

if (process.env.NODE_ENV === 'production') {
	jwtSecret = process.env.JWT_SECRET;
	dynDns = process.env.DYN_DNS;
} else {
	const config = require('config');
	jwtSecret = config.get('JWT_SECRET');
	dynDns = config.get('DYN_DNS');
}

module.exports = {
	auth: async function (req, res, next) {
		// Get token from header
		const token = req.header('x-auth-token');

		//Check if not token
		if (!token) {
			console.log('No Token!');
			return res.status(401).json({ msg: 'No token, authorization denied' });
		}

		try {
			const decoded = jwt.verify(token, jwtSecret);
			req.user = decoded.user;
			next();
		} catch (err) {
			console.log(err.message);
			res.status(401).json({ msg: 'Token is not valid' });
		}
	},

	admin: async function (req, res, next) {
		// Get token from header
		const token = req.header('x-auth-token');

		//Check if not token
		if (!token) {
			return res.status(401).json({ msg: 'No token, authorization denied' });
		}

		try {
			const decoded = jwt.verify(token, jwtSecret);
			req.user = decoded.user;

			let user = await User.findById(req.user.id);

			if (!user && user.Role !== 'admin')
				return res.status(401).send('Not Authorized');
			next();
		} catch (err) {
			console.log(err.message);
			res.status(401).json({ msg: 'Token is not valid' });
		}
	},

	authPour: async function (req, res, next) {
		dns.lookup(dynDns, (err, address, family) => {
			if (req.headers['x-forwarded-for'] !== address) {
				return res.status(401).json({ msg: 'Not Authorized' });
			}
		});

		next();
	},
};
