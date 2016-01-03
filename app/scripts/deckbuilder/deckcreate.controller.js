'use strict';

(function () {

	angular
		.module('Deckbuilder')
		.controller('DeckCreateCtrl', DeckCreateCtrl);


	DeckCreateCtrl.$inject = ['cardPool', 'cardApiService', 'deckData']


	function DeckCreateCtrl (cardPool, cardApiService, deckData) {
	    
	    var vm = this;
	    vm.deckData = deckData;
	    vm.cardPool = cardPool;
	   
	    vm.form = {};

	    vm.setHero = function (hero) {

	    	vm.form.hero = hero;

	    	vm.form.deckName = deckData.generateDeckName(hero.name);

	    	vm.deckData.createDeck(vm.form.deckName, vm.form.hero)
	    }

	    /**
	     * Get hero cards from API
	     */
	    cardApiService.getCardsByType('Hero')
	    .then(function (response) {

	    	vm.cardPool.heroes = response.data;

	    })
	    .catch(function (error) {
	        console.error(error);
	    });
	}

})();