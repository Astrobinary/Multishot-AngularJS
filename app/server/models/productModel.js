var mongoose = require('mongoose');

var schema = {
	name: String,
	avatar: String,
	oddshots: Array

};

var Products = mongoose.model('Products', schema);

module.exports = Products;
