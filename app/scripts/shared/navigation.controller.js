(function () {

	'use strict';

	
	angular
		.module('appCore')
		.controller('NavigationController', NavigationController)


	NavigationController.$inject = ['$rootScope','$location', 'deckData'];


	function NavigationController ($rootScope, $location, deckData) {

		var vm = this;
		vm.loadDeck = deckData.loadDeck;
		vm.deckData = deckData;

		$rootScope.$on("$routeChangeSuccess", function(event, next, previous, error) {

		    vm.path = $location.path();

		});
	}

})();