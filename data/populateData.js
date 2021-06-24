const fs = require('fs');

// Load SRM Model
const Srm = require('../models/Srm');

module.exports = {
	// Populate SRM Table if it doesn't already exist
	populateSrm: function () {
		try {
			Srm.findOne({}, {}, { sort: { created_at: -1 } }, function (err, srm) {
				if (err) throw err;

				if (!srm) {
					console.log('Populating SRM Collection...');

					let rawdata = fs.readFileSync('./data/srm.json');
					let srms = JSON.parse(rawdata);

					srms.forEach((element) => {
						const newSrm = {
							srm: element.srm,
							rgb: element.rgb,
						};

						new Srm(newSrm)
							.save()
							.then((srm) => {
								console.log('SRM Added: ' + srm);
							})
							.catch((err) => {
								console.log(`There was an error creating new srm: ${err}`);
							});
					});
				}
			});
		} catch (err) {
			console.log(
				`There was an error trying to populate the srm table: ${err}`
			);
		}
	},
};
