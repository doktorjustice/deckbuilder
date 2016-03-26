(function () {

	'use strict';
	

	angular
		.module('appCore')
		.directive('appNavigation', appNavigation)


	function appNavigation () {
		return {
			restrict: 'E',
			scope: {},
			templateUrl: 'templates/navigation.html',
			controller: 'NavigationController',
			controllerAs: 'navigation',
		}
	}
})();