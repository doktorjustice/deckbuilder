'use strict';

(function () {


	angular
		.module('AppCore')
		.directive('appNavigation', appNavigation)


	function appNavigation () {
		return {
			restrict: 'E',
			scope: {},
			templateUrl: 'templates/navigation.html',
			controller: 'navigationController',
			controllerAs: 'navigation',
		}
	}
})();