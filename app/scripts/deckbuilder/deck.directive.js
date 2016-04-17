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


	function link (scope, elem, attrs) {

		var deckName = angular.element(elem[0].children[0]);

		deckName.on('mouseenter mouseleave', function (event) {

			deckName.toggleClass("text-info");

		})
	}

})();