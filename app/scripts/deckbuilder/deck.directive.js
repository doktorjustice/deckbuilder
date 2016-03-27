(function () {

	'use strict';


	angular
		.module('deckBuilder')
		.directive('myDeck', myDeck)


	function myDeck () {

		return {
			restrict: 'E',
			scope: {
				currentDeck: '=',
			},
			templateUrl: 'templates/mydeck.html',
			controller: 'Deck',
			controllerAs: 'deck',
		}
	}

})();