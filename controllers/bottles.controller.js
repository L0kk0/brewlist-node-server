const mongoose = require('mongoose');

// Load Models
const Bottle = require('../models/Bottle.js');
const Srm = require('../models/Srm.js');

// @route   GET /bottles
// @desc    Get Bottles
// @access  Public
exports.getBottles = async (req, res) => {
	await Bottle.find()
		.sort({ name: 'ascending' })
		.then((bottles) => {
			res.status(200).send(bottles);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err);
		});
};

// @route   POST /bottles
// @desc    Add New Bottle
// @access  Private
exports.postBottles = async (req, res) => {
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

		let newBottle = new Bottle({
			active: req.body.active,
			name: req.body.name,
			style: req.body.style,
			notes: req.body.notes,
			og: req.body.og,
			fg: req.body.fg,
			srm: req.body.srm,
			rgb: rgb,
			ibu: req.body.ibu,
			bottlesLeft: req.body.bottlesLeft,
		});

		await newBottle.save((err, beer) => {
			if (err) {
				throw err;
			} else if (beer) {
				res.status(200).json(beer);
			} else {
				res
					.status(500)
					.send({ error: 'There was an error adding bottled beer' });
			}
		});
	} catch (error) {
		console.log(`Error adding bottled beer: ${error}`);
		res.status(500).send({ error: error });
	}
};

// @route   PUT /bottles/:id
// @desc    Pour Bottle
// @access  Private
exports.pourBottle = async (req, res) => {
	try {
		await Bottle.findById(req.params.id, async (err, bottle) => {
			if (err) {
				throw err;
			}
			let updateAmount = bottle.bottlesLeft - 1;

			bottle.bottlesLeft = updateAmount;

			await bottle.save();

			res.status(200).send(bottle);
		});
	} catch (err) {
		console.log(`Error Updating Bottle: ${err}`);
		res.status(500).send({ error: err });
	}
};

// @route   PUT /bottles
// @desc    Update a Bottle
// @access  Private
exports.putBottles = async (req, res) => {
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

		let bottleToUpdate = {
			active: req.body.active,
			name: req.body.name,
			style: req.body.style,
			notes: req.body.notes,
			og: req.body.og,
			fg: req.body.fg,
			srm: req.body.srm,
			rgb: rgb,
			ibu: req.body.ibu,
			bottlesLeft: req.body.bottlesLeft,
		};

		const updatedBottle = await Bottle.findByIdAndUpdate(
			req.body._id,
			bottleToUpdate,
			{ new: true }
		);

		if (updatedBottle) {
			res.status(200).json(updatedBottle);
		}
	} catch (err) {
		console.log(`Error updating bottled beer: ${err}`);
		res.status(500).send({ error: err });
	}
};

// @route   DELETE /bottles/:id
// @desc    Delete a Bottle
// @access  Private
exports.deleteBottles = async (req, res) => {
	try {
		await Bottle.findByIdAndDelete(req.params.id, (err) => {
			if (err) {
				throw err;
			} else {
				res.status(200).json(req.params.id);
			}
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({ error: err });
	}
};
