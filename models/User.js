const mongoose = require('mongoose');
const Str = mongoose.Schema.Types.String;
Str.checkRequired((v) => v != null);

// Create Shema
const UserSchema = new mongoose.Schema({
	Email: {
		type: String,
		required: true,
		unique: true,
	},
	Password: {
		type: String,
		required: true,
		select: false,
	},
});

// Create collection and add schema
module.exports = mongoose.model('user', UserSchema);
