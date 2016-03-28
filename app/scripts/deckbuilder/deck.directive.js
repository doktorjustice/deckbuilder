(function () {

	'use strict';


	angular
		.module('deckBuilder')
		.directive('deck', deck)


	function deck () {

		return {
			restrict: 'E',
			scope: {},
			bindToController: {
				insertDeck: '=',
			},
			templateUrl: 'templates/deck.html',
			controller: 'Deck',
			controllerAs: 'deck',
			link: link
		}
	}


	function link (scope, element, attrs) {

		//...
	}

})();