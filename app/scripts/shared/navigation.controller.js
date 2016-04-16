(function () {

	'use strict';

	
	angular
		.module('appCore')
		.controller('NavigationController', NavigationController)


	NavigationController.$inject = ['$rootScope','$location', 'deckData', 'authService', '$firebaseAuthService', '$scope', 'userData', 'path'];


	function NavigationController ($rootScope, $location, deckData, authService, $firebaseAuthService, $scope, userData, path) {
		console.log(userData);
		console.log(path);
		var vm = this;
		vm.loadDeck = deckData.loadDeck;
		vm.deckData = deckData;
		vm.auth = authService;
		vm.userData = userData[0];


		$rootScope.$on("$routeChangeSuccess", function (event, next, previous, error) {

		    vm.path = $location.path();
		});
	}

})();