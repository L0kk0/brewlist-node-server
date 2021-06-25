const mongoose = require('mongoose');

// Load Models
const Tap = require('../models/Tap.js');
const Srm = require('../models/Srm.js');

// @route   GET /api/taps
// @desc    Get a list of all taps
// @access  Public
exports.getTaps = async (req, res) => {
	await Tap.find()
		.sort({ tapNumber: 'ascending' })
		.then((tapbeers) => {
			res.status(200).send(tapbeers);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err);
		});
};

// @route   POST /taps
// @desc    Add New Tap
// @access  Private
exports.postTaps = async (req, res) => {
	try {
		let rgb = '';

		await Srm.findOne({ srm: req.body.srm }).then((srm) => {
			if (srm) {
				rgb = srm.rgb;
			} else {
				rgb = '255,255,255';
				console.log(
					"Couldn't get SRM RGB Value, Substituting Default Color Value"
				);
			}
		});

		let newTap = new Tap({
			active: req.body.active,
			tapNumber: req.body.tapNumber,
			name: req.body.name,
			style: req.body.style,
			notes: req.body.notes,
			og: req.body.og,
			fg: req.body.fg,
			srm: req.body.srm,
			rgb: rgb,
			ibu: req.body.ibu,
			amtLeft: req.body.amtLeft,
			kegSize: req.body.kegSize,
		});

		await newTap.save((err, beer) => {
			if (err) {
				throw err;
			} else if (beer) {
				res.status(200).json(beer);
			} else {
				res.status(500).send({ error: 'There was an error adding tap beer' });
			}
		});
	} catch (error) {
		console.log(`Error adding tap beer: ${error}`);
		res.status(500).send({ error: error });
	}
};

// @route   PUT /taps/:id/:amt
// @desc    Pour a Tap Beer
// @access  Private
exports.pourTap = async (req, res) => {
	try {
		const tap = await Tap.findById(req.params.id);

		let updatedAmount = tap.amtLeft - req.params.amt;

		if (updatedAmount < 0) {
			updatedAmount = 0;
		}

		tap.amtLeft = updatedAmount;

		await tap.save((err, tapBeer) => {
			if (err) {
				console.log('err', err);
				throw err;
			} else if (tapBeer) {
				console.log('TapBeer', tapBeer);
				res.json(tapBeer);
			} else {
				console.log('Else', tapBeer);
				res.status(500).send({ error: 'There was an error adding tap beer' });
			}
		});
	} catch (err) {
		console.log(`Error Updating Tap: ${err}`);
		return res.status(500).send({ error: err });
	}
};

// @route   PUT /taps
// @desc    Update a Tap
// @access  Private
exports.putTaps = async (req, res) => {
	try {
		let rgb = '';

		await Srm.findOne({ srm: req.body.srm }).then((srm) => {
			if (srm) {
				rgb = srm.rgb;
			} else {
				rgb = '255,255,255';
				console.log("Couldn't get SRM RGB Value");
			}
		});

		let updatedTap = {
			active: req.body.active,
			tapNumber: req.body.tapNumber,
			name: req.body.name,
			style: req.body.style,
			notes: req.body.notes,
			og: req.body.og,
			fg: req.body.fg,
			srm: req.body.srm,
			rgb: rgb,
			ibu: req.body.ibu,
			amtLeft: req.body.amtLeft,
			kegSize: req.body.kegSize,
		};

		await Tap.findByIdAndUpdate(
			req.body._id,
			req.body,
			{ new: true },
			(err, tap) => {
				if (err) {
					throw err;
				} else {
					res.status(200).json(tap);
				}
			}
		);
	} catch (err) {
		console.log(`Error updating tap beer: ${err}`);
		res.status(500).send({ error: err });
	}
};

// @route   DELETE /taps/:id
// @desc    Delete a Tap Beer
// @access  Private
exports.deleteTaps = async (req, res) => {
	try {
		await Tap.findByIdAndDelete(req.params.id, (err, beer) => {
			if (err) {
				throw err;
			} else {
				res.status(200).json(beer);
			}
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({ error: err });
	}
};
