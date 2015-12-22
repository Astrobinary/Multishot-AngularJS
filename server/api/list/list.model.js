'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ListSchema = new Schema({
	names: String,
});

module.exports = mongoose.model('List', ListSchema);
