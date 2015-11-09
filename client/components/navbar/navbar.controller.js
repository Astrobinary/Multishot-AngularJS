'use strict';

angular.module('multishotAppApp')
	.controller('NavbarCtrl', function ($scope, $location, $route) {
		$scope.menu = [{
			'title': 'Home',
			'link': '/'
    }];

		$scope.isCollapsed = true;

		$scope.isActive = function (route) {
			return route === $location.path();
		};

		$scope.reload = function () {
			$route.reload();
			$location.path('/');

		};

	});
