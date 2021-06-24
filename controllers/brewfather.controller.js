const mongoose = require('mongoose');
const axios = require('axios');

let userName;

if (process.env.NODE_ENV === 'production') {
	jwtSecret = `${process.env.BREWFATHER_API_ID}:${process.env.BREWFATHER_API_KEY}`;
} else {
	config = require('config');
	jwtSecret = `${config.get('BREWFATHER_API_ID')}:${config.get(
		'BREWFATHER_API_KEY'
	)}`;
}

// @route   GET /api/brewfather
// @desc    Get Batches from Brewfather
// @access  Private
exports.getBatches = async (req, res) => {
	axios
		.get('https://api.brewfather.app/v1/batches?status=Completed', {
			headers: { ContentType: 'application/json' },
			auth: {
				username: userName,
				password: '',
			},
		})
		.then(function (batches) {
			res.status(200).send(batches.data);
		})
		.catch(function (error) {
			console.log(`Error getting Brewfather batches: ${error}`);
			res.status(500).send({ error: error });
		});
};

// @route   GET /api/brewfather/:id
// @desc    Get Batch from Brewfather
// @access  Private
exports.getBatch = async (req, res) => {
	axios
		.get(`https://api.brewfather.app/v1/batches/${req.params.id}`, {
			headers: { ContentType: 'application/json' },
			auth: {
				username: userName,
				password: '',
			},
		})
		.then(function (batch) {
			res.status(200).send(batch.data);
		})
		.catch(function (error) {
			console.log(`Error getting Brewfather batche: ${error}`);
			res.status(500).send({ error: error });
		});
};
