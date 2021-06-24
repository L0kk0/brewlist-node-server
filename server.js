const express = require('express');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');

// Connect Database
connectDB();

// Populate Data Tables if they don't already exist
let data = require('./data/populateData');
data.populateSrm();

// Init Middleware
app.use(express.json({ extended: true }));

if (process.env.NODE_ENV === 'production') {
	var corsOptions = {
		origin: process.env.LGI_CORS,
		optionsSuccessStatus: 200,
	};
	app.use(cors(corsOptions));
}

//Define Routes
app.use('/', require('./routes/default.route'));
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/user', require('./routes/user.route'));
app.use('/api/settings', require('./routes/settings.route'));
app.use('/api/taps', require('./routes/taps.route'));
app.use('/api/bottles', require('./routes/bottles.route'));
app.use('/api/brewfather', require('./routes/brewfather.route'));
app.use(function (req, res) {
	res.sendStatus(404);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
	console.log(`Server started on port ${PORT} @ ${new Date()}`)
);
