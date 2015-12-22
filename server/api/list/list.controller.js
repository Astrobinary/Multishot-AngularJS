/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /streams              ->  index
 * POST    /streams              ->  create
 * GET     /streams/:id          ->  show
 * PUT     /streams/:id          ->  update
 * DELETE  /streams/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var List = require('./list.model');

// Get list
exports.index = function (req, res) {
	List.find(function (err, list) {
		if(err) {
			return handleError(res, err);
		}
		return res.status(200).json(list);
	});
};

// Get a single list
exports.show = function (req, res) {
	List.find({
		name: req.params.name,
	}, function (err, poll) {
		if(err) {
			return handleError(res, err);
		}
		if(!poll) {
			return res.send(404);
		}

		return res.json(poll);

	});
};

// Creates a new stream in the DB.
exports.create = function (req, res) {
	List.create(req.body, function (err, list) {
		if(err) {
			return handleError(res, err);
		}
		return res.status(201).json(list);
	});
};

// Updates an existing stream in the DB.
exports.update = function (req, res) {
	if(req.body._id) {
		delete req.body._id;
	}
	List.findById(req.params.id, function (err, list) {
		if(err) {
			return handleError(res, err);
		}
		if(!list) {
			return res.status(404).send('Not Found');
		}
		var updated = _.merge(list, req.body);
		updated.save(function (err) {
			if(err) {
				return handleError(res, err);
			}
			return res.status(200).json(list);
		});
	});
};

// Deletes a list from the DB.
exports.destroy = function (req, res) {
	List.findById(req.params.id, function (err, list) {
		if(err) {
			return handleError(res, err);
		}
		if(!list) {
			return res.status(404).send('Not Found');
		}
		list.remove(function (err) {
			if(err) {
				return handleError(res, err);
			}
			return res.status(204).send('No Content');
		});
	});
};

function handleError(res, err) {
	return res.status(500).send(err);
}
