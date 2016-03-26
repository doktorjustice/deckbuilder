(function () {

	'use strict';


	angular
		.module('cards')
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