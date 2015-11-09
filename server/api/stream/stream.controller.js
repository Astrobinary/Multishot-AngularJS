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
var Stream = require('./stream.model');

// Get list of streams
exports.index = function (req, res) {
	Stream.find(function (err, streams) {
		if(err) {
			return handleError(res, err);
		}
		return res.status(200).json(streams);
	});
};

// Get a single stream
exports.show = function (req, res) {
	Stream.find({
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
	Stream.create(req.body, function (err, stream) {
		if(err) {
			return handleError(res, err);
		}
		return res.status(201).json(stream);
	});
};

// Updates an existing stream in the DB.
exports.update = function (req, res) {
	if(req.body._id) {
		delete req.body._id;
	}
	Stream.findById(req.params.id, function (err, stream) {
		if(err) {
			return handleError(res, err);
		}
		if(!stream) {
			return res.status(404).send('Not Found');
		}
		var updated = _.merge(stream, req.body);
		updated.save(function (err) {
			if(err) {
				return handleError(res, err);
			}
			return res.status(200).json(stream);
		});
	});
};

// Deletes a stream from the DB.
exports.destroy = function (req, res) {
	Stream.findById(req.params.id, function (err, stream) {
		if(err) {
			return handleError(res, err);
		}
		if(!stream) {
			return res.status(404).send('Not Found');
		}
		stream.remove(function (err) {
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
