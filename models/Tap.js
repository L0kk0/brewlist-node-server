const mongoose = require('mongoose');

// Create Tap Beer Shema
const TapSchema = mongoose.Schema({
	active: {
		type: Boolean,
		required: true,
	},
	tapNumber: {
		type: Number,
	},
	name: {
		type: String,
	},
	style: {
		type: String,
	},
	notes: {
		type: String,
	},
	og: {
		type: Number,
	},
	fg: {
		type: Number,
	},
	srm: {
		type: String,
	},
	rgb: {
		type: String,
	},
	ibu: {
		type: Number,
	},
	amtLeft: {
		type: Number,
	},
	kegSize: {
		type: Number,
	},
});

module.exports = mongoose.model('tap', TapSchema);
