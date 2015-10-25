var Products = require('../../models/products');

// Wrap all the methods in an object
var product = {
	read: function (req, res, next) {
		res.json({
			type: "Read",
			id: req.params.id
		});
	},
	create: function (req, res, next) {
		Products.create(req.body, function (err, data) {
			if(err) console.log(err);
			res.json(data);
		});
	},
	update: function (req, res, next) {
		res.json({
			type: "Update",
			id: req.params.id,
			body: req.body
		});
	},
	delete: function (req, res, next) {
		Products.findById(req.params.id, function (err, data) {
			if(err) {
				return handleError(res, err);
			}
			if(!data) {
				return res.status(404).send('Not Found');
			}
			data.remove(function (err) {
				if(err) {
					return handleError(res, err);
				}
				return res.status(204).send('No Content');
			});
		});
	},
	getAll: function (req, res, next) {
		Products.find(function (err, data) {
			if(err) console.log(err);
			res.json(data);
		});
	}
};

// Return the object
module.exports = product;
