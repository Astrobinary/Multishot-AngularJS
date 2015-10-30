angular.module('Main.products')
	.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
			$routeProvider.
			when('/*', {
				templateUrl: '/index.html',
				controller: 'productsController'
			}).
			when('/bacon/cheese', {
				templateUrl: '/index.html',
				controller: 'productsController'
			}).
			when('/menus/:id', {
				templateUrl: 'views/job-detail.html',
				controller: 'JobDetailController'
			});

			//you can include a fallback by  including .otherwise({
			//redirectTo: '/jobs'
			//});

			//check browser support
			if(window.history && window.history.pushState) {
				//$locationProvider.html5Mode(true); will cause an error $location in HTML5 mode requires a  tag to be present! Unless you set baseUrl tag after head tag like so: <head> <base href="/">

				// to know more about setting base URL visit: https://docs.angularjs.org/error/$location/nobase

				// if you don't wish to set base URL then use this
				$locationProvider.html5Mode({
					enabled: true,
					requireBase: false
				});
			}
    }]);
