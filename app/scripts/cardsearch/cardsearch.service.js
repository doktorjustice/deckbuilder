(function () {

	'use strict';

	
	angular
		.module('cards')
		.factory('cardSearch', cardSearch)


	cardSearch.$inject = ['$q', 'cardApi', 'cardData'];


	function cardSearch ($q, cardApi, cardData) {


		var cardSearch = {};
		cardSearch.criteria = {};
		cardSearch.updateSearch = updateSearch;

		return cardSearch;


		function updateSearch (form) {

			cardSearch.criteria = processForm(form);
		}	


		function processForm (form) {

			var newCriteria = {};

			angular.forEach(form, function (settings, formSection) {

				newCriteria[formSection] = [];

				angular.forEach(settings, function (isChecked, element) {

					if (isChecked && element != 'all') {

						newCriteria[formSection].push(element);
					}
				})
			})

			return newCriteria;
		}
	}

})();