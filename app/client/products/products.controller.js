(function () {

	angular
		.module("Main.products", [])
		.controller("productsController", productsController);

	function productsController($scope, productsService, $http, $sce, $timeout, $location, $rootScope) {
		$scope.selected = 0;
		$scope.showVideos = false;
		$scope.init = false;

		$rootScope.$on('$locationChangeSuccess', function () {
			$rootScope.actualLocation = $location.path();
		});

		$rootScope.$watch(function () {
			return $location.path();
		}, function (newLocation, oldLocation) {
			if($rootScope.actualLocation === newLocation) {
				if(newLocation !== '/') {
					var urlName = $location.path().slice(1, $location.path().length);
					productsService.getUser(urlName).then(modelProducts);
					$scope.twitchName = urlName;
					$('.top-shot-small').slick('unslick');
					$scope.startCarousel();
				} else {
					$scope.homePage();
				}

			}
		});

		var modelProducts = function (data) {
			$scope.products = data;

			var temp = data[0].oddshots.length - 1;
			$scope.mainVideo = data[0].oddshots[temp].link;
			$scope.mainGame = data[0].oddshots[temp].game;

			videoResize();

		};

		$scope.selectStream = function (name, position) {
			$location.url('/' + name);
			$scope.slideNumber = position;
			productsService.getUser(name).then(modelProducts);
			if(!$scope.showVideos)
				$scope.startCarousel();
			$scope.twitchName = name;
			$scope.showVideos = true;
			$scope.selected = 0;

		};

		$scope.startCarousel = function () {
			$(".top-shot-small").slick({
				slidesToShow: 7,
				slidesToScroll: 2,
				centerMode: true,
				focusOnSelect: true,
				variableWidth: true,
				initialSlide: $scope.carouselPosition()
			});
			$timeout($scope.refreshCarousel, 10);
		};

		$scope.homePage = function () {
			$scope.showVideos = false;
			$location.url('/');

			if($('.top-shot-small').slick('getSlick') !== undefined)
				$('.top-shot-small').slick('unslick');

		};

		$scope.carouselPosition = function () {
			if($location.path() === '/Lirik') {
				return 0;

			} else if($location.path() === '/Goldglove') {
				return 1;
			}
			else {
				$scope.homePage();
			}

		};

		$scope.refreshCarousel = function () {
			$('.top-shot-small').slick('setPosition');
		};

		if($location.path() !== '/' && !$scope.init) {
			var urlName = $location.path().slice(1, $location.path().length);
			productsService.getUser(urlName).then(modelProducts);
			$scope.twitchName = urlName;
			$scope.showVideos = true;
			$scope.startCarousel();
			$scope.carouselPosition();
			$scope.refreshCarousel();
			$scope.init = true;
		} else {
			$scope.init = false;
			$scope.showVideos = false;

		}

		$(".top-shot-small img").click(function () {
			var name = $(this).attr('alt');
			$scope.twitchName = name;
			$scope.$apply();
			$scope.selectStream(name);

		});

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
		$scope.refreshPage = function () {
			location.reload();
		};

		$scope.recentShot = function (link, game, index) {
			$scope.mainVideo = link;
			$scope.mainGame = game;
			$scope.selected = index;
		};

		var videoResize = function () {
			if($scope.fullscreen === true) {

				if($(window).width() > 1400) {
					$scope.videoWidth = 1600;
					$scope.videoHeight = 900;
				} else {
					$scope.videoWidth = 1280;
					$scope.videoHeight = 800;
				}
			} else {
				$scope.videoWidth = 680;
				$scope.videoHeight = 380;
			}

		};

		// var options = {
		// 	options: {
		// 		debug: true
		// 	},
		// 	connection: {
		// 		random: "chat",
		// 		reconnect: true
		// 	},
		// 	identity: {
		// 		username: "KingAgnostic",
		// 		password: "oauth:kyo9svys672pxvqlmudthegr3u7xmk"
		// 	},
		// 	channels: ["agnostics", "syndicate", "captiansparklez", "lirik", "summit1g", "sodapoppin", "goldglove", "trick2g", "GiantWaffle", "swiftor"]
		// };
		//
		// var client = new irc.client(options);

		// client.connect();

		$scope.filterLink = function (link) {
			return $sce.trustAsResourceUrl(link);
		};

	}

}());
