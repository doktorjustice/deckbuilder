(function () {

	'use strict';

	
	angular
		.module('appCore')
		.controller('NavigationController', NavigationController)


	NavigationController.$inject = ['$rootScope','$location', 'deckData', 'firebaseService'];


	function NavigationController ($rootScope, $location, deckData, firebaseService) {

		var vm = this;
		vm.loadDeck = deckData.loadDeck;
		vm.deckData = deckData;


		firebaseService.deckListLoaded()
		.then(function () {

			vm.decksLoaded = true;
		})
		.catch(function (error) {
			
			console.error(error);
		})


		$rootScope.$on("$routeChangeSuccess", function (event, next, previous, error) {

		    vm.path = $location.path();
		});
	}

})();