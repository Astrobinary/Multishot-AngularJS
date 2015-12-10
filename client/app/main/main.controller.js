'use strict';
angular.module('multishotAppApp')
	.controller('MainCtrl', function ($scope, $http, $location, $routeParams, $sce, $timeout, $route, $rootScope) {

		$scope.footerStyle = 'home-footer';

		//Prevents reload on location path unless wanted.
		var original = $location.path;
		$location.path = function (path, reload) {
			if(reload === false) {
				var lastRoute = $route.current;
				var un = $rootScope.$on('$locationChangeSuccess', function () {
					$route.current = lastRoute;
					un();
				});
			}
			return original.apply($location, [path]);
		};

		//Initialize carousel
		var startCarousel = function () {
			$('.top-shot-small').slick({
				slidesToShow: 7,
				slidesToScroll: 2,
				centerMode: true,
				focusOnSelect: true,
				variableWidth: true,
				draggable: false,
				arrows: false,
				initialSlide: $scope.carouselPosition()
			});
		};

		//User selects a streamer from the homepage
		$scope.selectStream = function (name) {
			$location.path('/' + name, false);
			$scope.footerStyle = 'video-footer';
			initializeVideos(name);
			startCarousel();
			// $scope.refreshCarousel();
			$timeout($scope.refreshCarousel, 10);
		};

		//Populates video page with data from stream selected.
		var initializeVideos = function (name) {
			$http.get('/api/streams/' + name).success(function (stream) {
				$scope.stream = stream;
				var recentVideo = stream[0].oddshots.length - 1;
				$scope.mainVideo = stream[0].oddshots[recentVideo].link;
				$scope.mainGame = stream[0].oddshots[recentVideo].game;
				$scope.twitchName = name;
				$scope.selectedVideo = 0;
				$scope.showVideos = true;
				$scope.videoPlay();
			});
		};

		//Handles video player
		$scope.videoPlay = function () {
			$scope.sources = {
				preload: 'none',
				sources: [{
					src: $sce.trustAsResourceUrl($scope.mainVideo),
					type: 'video/mp4'
					}],
				plugins: {
					controls: {
						autoHide: true,
						autoHideTime: 1000
					}
				}
			};
		};

		$scope.carouselPosition = function () {
			if($location.path() === '/Lirik') {
				return 0;
			} else if($location.path() === '/Goldglove') {
				return 1;
			}
		};

		$scope.vote = function (direction) {
			// TODO: Write vote logic here!
			if(direction === 'up') {
				$scope.styleUpVote = 'press';
				$scope.styleDownVote = '';
			} else {
				$scope.styleUpVote = '';
				$scope.styleDownVote = 'press';
			}
		};

		// Checks url to match data displayed.
		if($routeParams.user !== undefined) {
			initializeVideos($routeParams.user);
			startCarousel();
			$scope.carouselPosition();
			$timeout($scope.refreshCarousel, 100);
			$scope.footerStyle = 'video-footer';

		}

		//When carousel image is pressed.
		$('.top-shot-small img').click(function () {
			var name = $(this).attr('alt');
			$location.path('/' + name, false);
			$scope.twitchName = name;
			initializeVideos(name);

			$scope.$apply();
		});

		//When a video is selected from Recent Shots
		$scope.selectShot = function (link, game, index) {
			$scope.mainVideo = link;
			$scope.mainGame = game;
			$scope.selectedVideo = index;
			$scope.videoPlay();
		};

		$scope.refreshCarousel = function () {
			$('.top-shot-small').slick('setPosition');
		};

	}); //end of controller
