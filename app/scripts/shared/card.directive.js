(function () {

	'use strict';
	

	angular
		.module('appCore')
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

		scope.card.img = scope.card.img.replace('http', 'https');
	}

})();