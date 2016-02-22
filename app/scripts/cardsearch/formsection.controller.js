'use strict';

(function () {


	angular
		.module('Cards')
		.controller('FormSectionCtrl', FormSectionCtrl)

	FormSectionCtrl.$inject = ['$location', 'cardData', 'cardApi', 'cardSearch'];

	function FormSectionCtrl ($location, cardData, cardApi, cardSearch) {

		var vm = this;
		vm.cardData = cardData;
		vm.checkCheckboxes = checkCheckboxes;
		vm.uncheckCheckboxes = uncheckCheckboxes;
		vm.updateSearch = cardSearch.updateSearch;


		function checkCheckboxes (form, section) {

			setAllValuesTrue(form, section);
			cardSearch.updateSearch(form);
		}


		function uncheckCheckboxes (form, section) {
		
			setAllValuesFalse(form, section);
			cardSearch.updateSearch(form);
		}


		function setAllValuesTrue (form, section) {

			if (form[section].all) {

				cardData[section].forEach(function (itemInList) {

					form[section][itemInList] = true;
				})
			}
		}


		function setAllValuesFalse (form, section) {

			cardData[section].forEach(function (itemInList) {

				form[section][itemInList] = false;
				form[section].all = false;
			})

		}
		
	}

})();