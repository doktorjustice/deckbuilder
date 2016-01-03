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

	    var link = function (scope, element, attrs) {
	        //...
	    }

	}

})();