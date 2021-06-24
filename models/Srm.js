const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Fermentable Shema
const SrmSchema = new Schema({
	// Tap Beer Properties
	srm: {
		type: Number,
	},
	rgb: {
		type: String,
	},
});

// Create collection and add schema
module.exports = mongoose.model('srm', SrmSchema);
