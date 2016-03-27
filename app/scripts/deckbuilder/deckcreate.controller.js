(function () {

	'use strict';

	
	angular
		.module('deckBuilder')
		.controller('DeckCreateCtrl', DeckCreateCtrl);


	DeckCreateCtrl.$inject = ['$location', 'cardData', 'cardApi', 'deckData']


	function DeckCreateCtrl ($location, cardData, cardApi, deckData) {
	    
	    var vm = this;

	    vm.deckData = deckData;
	    vm.cardData = cardData;
	    vm.startDeck = startDeck;


	    // Preload hero cards
	    cardApi.getCardsByType('Hero')
	    .then(function (response) {

	    	vm.cardData.heroes = response.data;
	    })
	    .catch(function (error) {
	        console.error(error);
	    });


	    function startDeck (hero) {

	    	var deckName = deckData.generateDeckName(hero.name);
	    	deckData.createDeck(deckName, hero);
	    
	    	$location.path('/editor');
	    }
	}

})();