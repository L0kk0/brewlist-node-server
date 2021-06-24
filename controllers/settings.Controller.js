const mongoose = require('mongoose');
const dns = require('dns');

// Load Models
const Settings = require('../models/Settings.js');

// Get Settings
exports.get = async (req, res) => {
	await Settings.findOne()
		.then(async (settings) => {
			let updatedSettings = {
				displayRemaining: settings.displayRemaining,
				allowTracking: settings.allowTracking,
				pourPermissions: settings.pourPermissions,
				permittedAddress: settings.permittedAddress,
				pourSize: settings.pourSize,
				dynamicPour: settings.dynamicPour,
				theme: settings.theme,
				kegSize: settings.kegSize,
				permittedIpAddress: '',
			};

			await dns.lookup(settings.permittedAddress, (err, ipAddress) => {
				updatedSettings.permittedIpAddress = ipAddress;
				res.status(200).send(updatedSettings);
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err);
		});
};

// Put Settings
exports.put = async (req, res) => {
	await Settings.findOneAndUpdate(req._id, req.body)
		.then((settings) => {
			res.status(200).send(settings);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err);
		});
};
