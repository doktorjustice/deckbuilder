'use strict';

(function () {

	angular
		.module('Deckbuilder')
		.controller('DeckCreateCtrl', DeckCreateCtrl);


	DeckCreateCtrl.$inject = ['$location', 'cardData', 'cardApi', 'deckData']


	function DeckCreateCtrl ($location, cardData, cardApi, deckData) {
	    
	    var vm = this;
	    vm.deckData = deckData;
	    vm.cardData = cardData;
	   
	    vm.form = {};

	    vm.setHero = function (hero) {

	    	vm.form.hero = hero;

	    	vm.form.deckName = deckData.generateDeckName(hero.name);

	    	vm.deckData.createDeck(vm.form.deckName, vm.form.hero);
	    	$location.path('/editor');
	    }


	    cardApi.getCardsByType('Hero')
	    .then(function (response) {

	    	vm.cardData.heroes = response.data;

	    })
	    .catch(function (error) {
	        console.error(error);
	    });
	}

})();