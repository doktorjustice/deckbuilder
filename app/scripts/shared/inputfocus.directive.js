(function () {

	'use strict';


	angular
		.module('appCore')
		.directive('focusOn', focusOn)

	focusOn.$inject = ['$timeout']

	function focusOn ($timeout) {

		return {
			restrict: 'A',
			link: link
		}

		function link (scope, element, attr) {

			scope.$watch(attr.focusOn, function(value) {

				if (value) {

					// Wait for DOM to be ready
					$timeout(function () {

						element[0].focus();
						//Place cursor at the end
						element[0].selectionStart = element[0].selectionEnd = element[0].value.length;
					})

				} else {

					element[0].blur();
				}
			})
		}
	}

})();