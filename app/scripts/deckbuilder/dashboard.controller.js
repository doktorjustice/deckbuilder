(function () {

	'use strict';


	angular
		.module('deckBuilder')
		.controller('DashboardCtrl', DashboardCtrl)


	DashboardCtrl.$inject = ['$location', '$window', 'deckData', 'cardData', 'authService', 'userData']


	function DashboardCtrl ($location, $window, deckData, cardData, authService, userData) {

		deckData.decks = userData[1];

	    var vm = this;

	    vm.deckData = deckData;
	    vm.editDeck = editDeck;
	    vm.showDeckStats = showDeckStats;
	    vm.deleteDeck = deleteDeck;
	    vm.auth = authService;


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