'use strict';

(function (){

	angular
		.module('Cards')
		.directive('searchForm', searchForm)

	function searchForm () {
		return {
			restrict: 'E',
			scope: {},
			bindToController: {
				fixedClass: '@'
			},
			templateUrl: 'templates/search_form.html',
			controller: 'SearchFormCtrl',
			controllerAs: 'searchForm',
			link: link
		}
	}

	function link (scope, element, attrs) {
		//...
	}

})();