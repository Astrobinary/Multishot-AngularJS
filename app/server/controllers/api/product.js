var Products = require('../../models/productModel');
var path = require('path');

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
	},
	getUser: function (req, res, next) {
		Products.find({
			name: req.params.name
		}, function (err, data) {
			if(err) console.log(err);
			res.json(data);
		});
	},
	displayUser: function (req, res, next) {
		Products.find({
			name: req.params.name
		}, function (err, data) {
			if(err) {
				return res.status(404).send('Not Found');
			} else {
				return res.sendFile(path.join(__dirname, '../../../client', 'index.html'));
			}
		});

	}
};

// Return the object
module.exports = product;
