(function () {

	var productsService = function ($http) {

		var getProducts = function () {
			return $http.get("/api/products")
				.then(function (response) {
					return response.data;
				});
		};

		return {
			getProducts: getProducts
		};

	};

	angular
		.module("Main")
		.factory("productsService", productsService);

}());
