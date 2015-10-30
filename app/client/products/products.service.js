(function () {

	var productsService = function ($http) {

		var getUser = function (user) {
			return $http.get("/api/user/" + user)
				.then(function (response) {
					return response.data;
				});
		};

		return {
			getUser: getUser
		};

	};

	angular
		.module("Main")
		.factory("productsService", productsService);

}());
