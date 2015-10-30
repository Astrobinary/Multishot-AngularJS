(function () {
	'use strict';

	angular
		.module('Main', ['Main.products', 'ngRoute'])
		.config(function ($routeProvider, $locationProvider) {
			$locationProvider.html5Mode({
				enabled: true,
				requireBase: false
			});
		});
}());
