'use strict',

(function () {


	angular
		.module('Cards')
		.controller('SearchFormCtrl', SearchFormCtrl)


	SearchFormCtrl.$inject = ['$location', 'cardData', 'cardApi', 'cardSearch']


	function SearchFormCtrl ($location, cardData, cardApi, cardSearch) {

		var vm = this;

		vm.cardData = cardData;
		vm.cardSearch = cardSearch;

		//Data model and initial values for the form
		vm.form = {

			playerClasses: {
				"Neutral": true,
			},
			sets: {
				"Basic": true,
			},
			rarities: {
				"Free" : true,
				"Common": true
			},
			types: {
				"all": true,
				"Minion": true,
				"Weapon": true,
				"Spell": true
			}
		};


		vm.formSections = {
			playerClasses: 'Classes',
			sets: 'Sets',
			rarities: 'Rareness',
			types: 'Types'
		}


		initializeForm(vm.fixedClass, vm.form);


		function initializeForm (classToSet, form) {

			adjustFormSettings(classToSet);
			cardSearch.updateSearch(form);
		}


		function adjustFormSettings (classToSet) {

			angular.forEach(vm.form.playerClasses, function (value, playerClass) {

				vm.form.playerClasses[playerClass] = false;
			})

			vm.form.playerClasses['Neutral'] = true;
			vm.form.playerClasses[classToSet] = true;
		}
	}

})();