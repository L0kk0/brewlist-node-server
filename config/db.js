const mongoose = require('mongoose');

let db = null;

if (process.env.NODE_ENV === 'production') {
	db = process.env.MONGODB_URI;
} else {
	let config = require('config');
	db = config.get('MONGODB_URI');
}

const connectDB = async () => {
	try {
		mongoose.connect(db, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		});
		console.log(`MongoDB Connected: ${new Date()}`);
	} catch (err) {
		console.log(err.message);
		process.exit(1);
	}
};

module.exports = connectDB;
