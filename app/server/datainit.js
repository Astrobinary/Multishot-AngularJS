var mongoose = require('mongoose'),
	dbname = 'multishot_database';

var Product = mongoose.model('Product', {
	name: String,
	avatar: String,
	oddshots: Array

});

mongoose.connect('mongodb://localhost/' + dbname);

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', deleteProducts);

function deleteProducts() {
	Product.remove({}, function (err) {
		if(err) console.log(err);
		insertProducts();
	});
}

function insertProducts() {
	var products = new Product({
		name: 'Lirik',
		avatar: 'http://static-cdn.jtvnw.net/jtv_user_pictures/lirik-profile_image-c0c34ecdea3ec322-300x300.jpeg',
		oddshots: [
			{
				link: 'http://oddshot.tv/shot/lirik-20150914232721569',
				game: 'Worms Reloaded',
				votes: 0
			}

		]

	});

	products.save(function (err) {
		if(err) console.log(err);
	});

}
