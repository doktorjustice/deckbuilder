(function () {

	'use strict';

	
	angular
		.module('appCore')
		.controller('NavigationController', NavigationController)


	NavigationController.$inject = ['$rootScope','$location', 'deckData', 'authService', '$firebaseAuthService', '$scope'];


	function NavigationController ($rootScope, $location, deckData, authService, $firebaseAuthService, $scope) {

		var vm = this;
		vm.loadDeck = deckData.loadDeck;
		vm.deckData = deckData;
		vm.auth = authService;


		$rootScope.$on("$routeChangeSuccess", function (event, next, previous, error) {

		    vm.path = $location.path();
		});
	}

})();