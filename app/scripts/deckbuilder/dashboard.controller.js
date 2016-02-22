'use strict';

(function () {


	angular
		.module('Deckbuilder')
		.controller('DashboardCtrl', DashboardCtrl)


	DashboardCtrl.$inject = ['$location', 'deckData', 'cardData']


	function DashboardCtrl ($location, deckData, cardData) {

	    var vm = this;
	    vm.deckData = deckData;

	    vm.editDeck = function (key) {

	    	deckData.loadDeck(key);
	    	$location.path("/editor");
	    }

	    vm.showDeckStats = function (key) {

	    	deckData.loadDeck(key);
	    	$location.path("/stats");
	    }


	}

})();