'use strict';

angular.module('multishotAppApp')
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'app/main/main.html',
				controller: 'MainCtrl'
			})

		.when('/:user', {
			templateUrl: 'app/main/main.html',
			controller: 'MainCtrl'
		});
	});
