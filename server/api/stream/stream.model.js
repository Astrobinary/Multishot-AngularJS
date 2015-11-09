'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var StreamSchema = new Schema({
	name: String,
	avatar: String,
	oddshots: Array

});

module.exports = mongoose.model('Stream', StreamSchema);
