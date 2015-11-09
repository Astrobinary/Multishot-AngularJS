/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Stream = require('../api/stream/stream.model');

Stream.find({}).remove(function () {
	Stream.create({
		"name": "Lirik",
		"avatar": "http://static-cdn.jtvnw.net/jtv_user_pictures/lirik-profile_image-c0c34ecdea3ec322-300x300.jpeg",
		"oddshots": [
			{
				"votes": 0,
				"game": "Arma III",
				"link": "https://d301dinc95ec5f.cloudfront.net/capture/lirik-20151020184910242.shot.mp4",
				"preview": "https://d301dinc95ec5f.cloudfront.net/thumbs/lirik-20151020184910242.shot.thumb.jpg"
        },
			{
				"votes": 0,
				"game": "Arma III",
				"link": "https://d301dinc95ec5f.cloudfront.net/capture/lirik-20151020221211368.shot.mp4",
				"preview": "https://d301dinc95ec5f.cloudfront.net/thumbs/lirik-20151020221211368.shot.thumb.jpg"
        },
			{
				"votes": 0,
				"game": "Arma III",
				"link": "https://d301dinc95ec5f.cloudfront.net/capture/lirik-20151020215445421.shot.mp4",
				"preview": "https://d301dinc95ec5f.cloudfront.net/thumbs/lirik-20151020215445421.shot.thumb.jpg"
        },
			{
				"votes": 0,
				"game": "Arma III",
				"link": "https://d301dinc95ec5f.cloudfront.net/capture/lirik-2015102022188421.shot.mp4",
				"preview": "https://d301dinc95ec5f.cloudfront.net/thumbs/lirik-2015102022188421.shot.thumb.jpg"
        },
			{
				"votes": 0,
				"game": "Arma III",
				"link": "https://d301dinc95ec5f.cloudfront.net/capture/lirik-20151020194750531.shot.mp4",
				"preview": "https://d301dinc95ec5f.cloudfront.net/thumbs/lirik-20151020194750531.shot.thumb.jpg"
        },
			{
				"votes": 0,
				"game": "Arma III",
				"link": "https://d301dinc95ec5f.cloudfront.net/capture/lirik-2015102117133764.shot.mp4",
				"preview": "https://d301dinc95ec5f.cloudfront.net/thumbs/lirik-2015102117133764.shot.thumb.jpg"
        }
    ]
	}, {

		"name": "Goldglove",
		"avatar": "",
		"oddshots": [
			{
				"preview": "https://d301dinc95ec5f.cloudfront.net/thumbs/goldglove-201508277548329.shot.thumb.jpg",
				"link": "https://d301dinc95ec5f.cloudfront.net/capture/goldglove-201508277548329.shot.mp4",
				"votes": 0,
				"game": "Gears of War"
        }
    ]
	});
});
