(function () {

	angular
		.module("Main.products", [])
		.controller("productsController", productsController);

	function productsController($scope, productsService, $http, $sce) {

		$scope.styleNav = 'navbar-small';
		$scope.carousel = true;

		var modelProducts = function (data) {
			$scope.products = data;
		};

		productsService.getProducts().then(modelProducts);

		if($scope.carousel) {
			$(".top-shot-small").jCarouselLite({
				btnNext: ".left",
				btnPrev: ".right",
				visible: 7,
				speed: 600,
				start: 5
			});
		}

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
