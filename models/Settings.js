const mongoose = require('mongoose');

// Create Tap Beer Shema
const SettingsSchema = mongoose.Schema({
	displayRemaining: {
		type: Boolean,
	},
	allowTracking: {
		type: Boolean,
	},
	pourPermissions: {
		type: Boolean,
	},
	permittedAddress: {
		type: String,
	},
	pourSize: {
		type: Number,
	},
	dynamicPour: {
		type: Boolean,
	},
	theme: {
		type: String,
	},
	kegSize: {
		type: Number,
	},
});

module.exports = mongoose.model('settings', SettingsSchema);
