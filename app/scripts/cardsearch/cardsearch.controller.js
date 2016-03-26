(function () {

	'use strict';


	angular
		.module('cards')
		.controller('CardSearchCtrl', CardSearchCtrl)


	CardSearchCtrl.$inject = ['cardData', 'cardSearch']


	function CardSearchCtrl (cardData, cardSearch) {

		var vm = this;

		vm.cardData = cardData;
		vm.cardSearch = cardSearch;

	}

})();