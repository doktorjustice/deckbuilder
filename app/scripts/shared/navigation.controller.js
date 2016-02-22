'use strict';

(function () {


	angular
		.module('AppCore')
		.controller('navigationController', navigationController)


	navigationController.$inject = ['$rootScope','$location', 'deckData'];


	function navigationController ($rootScope, $location, deckData) {

		var vm = this;
		vm.loadDeck = deckData.loadDeck;
		vm.deckData = deckData;

		$rootScope.$on("$routeChangeSuccess", function(event, next, previous, error) {

		    vm.path = $location.path();

		});
	}

})();