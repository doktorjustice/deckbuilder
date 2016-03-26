(function () {

	'use strict';


	angular
		.module('cards')
		.directive('formSection', formSection)


	function formSection () {

		return {
			restrict: 'E',
			scope: {
				form: '=',
				formSection: '@',
				title: '@'
			},
			templateUrl: 'templates/form_section.html',
			controller: 'FormSectionCtrl',
			controllerAs: 'section',
			link: link
		}
	}

	
	function link (scope, element, attrs) {
		//...
	}

})();