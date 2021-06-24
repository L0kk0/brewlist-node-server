const mongoose = require('mongoose');

// Create Tap Beer Shema
const BottleSchema = mongoose.Schema({
	active: {
		type: Boolean,
		required: true,
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
	bottlesLeft: {
		type: Number,
	},
});

module.exports = mongoose.model('bottle', BottleSchema);
