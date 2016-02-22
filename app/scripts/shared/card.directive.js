'use strict';

(function () {

	angular
		.module('AppCore')
		.directive('hearthstoneCard', hearthstoneCard)


	function hearthstoneCard() {
	    
	    return {
	        restrict: 'E',
	        scope: {
	            card: '=',
	        },
	        templateUrl: 'templates/card.html',
	        link: link
	    }
	}

	function link (scope, element, attrs) {

		// var placeholder = element[0].children[0];
		// var cardFace = element[0].children[1];

		// cardFace.addEventListener('load', imageLoaded)

		// function imageLoaded () {

		// 	angular.element(placeholder).css({'display': 'none'});
		// 	angular.element(cardFace).css({'display': 'block'});
		// }
	}

})();