'use strict';
angular.module('multishotAppApp')
	.controller('MainCtrl', function ($scope, $http, $location, $routeParams, $sce, $timeout, $route, $rootScope) {

		$scope.footerStyle = 'home-footer';
		$scope.userList = ['lirik', 'goldglove', 'giantwaffle', 'c9sneaky', 'shortyyguy', 'syndicate', 'trick2g', 'vernnotice'];
		$scope.top8 = [];

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

		$scope.buttonStart = function () {
			console.log('button start');

			if($scope.showVideos) {

			}

		};

		//User selects a streamer from the homepage
		$scope.selectStream = function (name) {
			$('.main-circle').fadeOut(500);

			$('.top-shot-full').animate({
				height: '40px'
			}, 500, function () {
				$location.path('/' + name, false);
				initializeVideos(name);
				startCarousel();

				$('.video-section').slideDown(1000, function () {
					$timeout($scope.refreshCarousel, 50);
					$('.top-shot-small').fadeTo(1000, 1, function () {
						$('.twitch-name').fadeTo(500, 1);
					});
					$('.more-videos').fadeIn(500);
				});

				$timeout(function () {
					$scope.footerStyle = 'video-footer';
				}, 1000);
			});

		};

		//Populates video page with data from stream selected.
		var initializeVideos = function (name) {
			$http.get('/api/streams/' + name).success(function (stream) {

				if(stream.length < 1) {
					$scope.showVideos = false;
					return;
				}

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
			if($location.path() === '/lirik') {
				return 0;
			} else if($location.path() === '/goldglove') {
				return 1;
			}
		};

		$scope.vote = function (direction) {
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

			$timeout(function () {
				$('.top-shot-small').fadeTo(1000, 1, function () {
					$('.twitch-name').fadeTo(500, 1);
				});
			}, 500);

			$('.video-section').show();
			$('.more-videos').show();
			$scope.footerStyle = 'video-footer';

			$timeout(function () {
				startCarousel();
			}, 500);

		}

		$scope.smallSelect = function (name) {
			$location.path('/' + name, false);
			$scope.twitchName = name;
			initializeVideos(name);
		};

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
		$scope.test = function () {

			console.log($scope.top8);
		};

		$scope.userList.forEach(function (name, order) {
			$.getJSON('https://api.twitch.tv/kraken/channels/' + name + '?client_id=5j0r5b7qb7kro03fvka3o8kbq262wwm&callback=?').success(function (data) {
				var obj = {};
				order++;

				obj.name = data.name;
				obj.logo = data.logo;
				obj.order = order;

				$scope.top8.push(obj);
				$scope.$apply();
			});

		});

	}); //end of controller
