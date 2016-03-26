(function () {

	'use strict';


	angular
		.module('deckBuilder')
		.controller('DashboardCtrl', DashboardCtrl)


	DashboardCtrl.$inject = ['$location', '$window', 'deckData', 'cardData']


	function DashboardCtrl ($location, $window, deckData, cardData) {

	    var vm = this;

	    vm.deckData = deckData;
	    vm.editDeck = editDeck;
	    vm.showDeckStats = showDeckStats;
	    vm.deleteDeck = deleteDeck;


	    function editDeck (key) {

	    	deckData.loadDeck(key);
	    	$location.path("/editor");
	    }


	    function showDeckStats (key) {

	    	deckData.loadDeck(key);
	    	$location.path("/stats");
	    }


	    function deleteDeck (deck) {
	    	
	    	var confirm = $window.confirm('Really delete ' + deck.deckName + ' deck? No turning back!');

	    	if (confirm) {

	    		deckData.removeDeck(deck);	
	    	}
	    }
	}

})();