'use strict';

(function (){


	angular
		.module('Deckbuilder')
		.factory('deckData', deckData);


	deckData.$inject = ['$location', 'firebaseService', 'deckStatsService'];


	function deckData ($location, firebaseService, deckStatsService) {

	    return deckData = {
	    	decks : firebaseService.decks,
	    	currentDeck : {},
	    	generateDeckName : generateDeckName,
	    	createDeck : createDeck,
	    	loadDeck : loadDeck,
	    	saveDeck : saveDeck,
	    	addCardToCurrentDeck : addCardToCurrentDeck,
	    	removeCardFromCurrentDeck : removeCardFromCurrentDeck,
	    };


	    function generateDeckName (className) {

	        var date = new Date();
	        var year = date.getFullYear();
	        var month = date.getMonth() + 1;
	        var day = date.getDate();

	        var name = className + ' / ' + year + '-' + month + '-' + day;

	        return name;
	    }


	    function createDeck (deckName, hero, cards) {

	        var newDeck = {
	            deckName: deckName,
	            hero: hero,
	            playerClass: hero.playerClass,
	            cards: cards || [],
	        };

	        firebaseService.saveNewDeck(newDeck)
	        .then(function (response) {

	            deckData.loadDeck(response.key());
	        })
	        .catch(function (error) {

	            console.error(error);
	        });
	    }


	    function saveDeck (deck) {

	        firebaseService.saveEditedDeck(deck)
	        .catch(function (error) {
	            console.error(error);
	        })
	    }


	    function addCardToCurrentDeck (newCard) {

	        deckData.currentDeck.cards = deckData.currentDeck.cards || [];

	        var deckCardFound = deckData.currentDeck.cards.find( function (card, index, array) {

	            return card.cardId == newCard.cardId;
	        })


	        if (deckCardFound) {

	            deckCardFound.deckCount += 1;

	        } else {
	 
	            deckData.currentDeck.cards.push(newCard);
	            newCard.deckCount = 1;
	        }


	        deckData.currentDeck.stats = deckStatsService.calcDeckStats(deckData.currentDeck.cards);

	        deckData.saveDeck(deckData.currentDeck);

	        return deckCardFound;
	    }


	    function removeCardFromCurrentDeck (deckCard) {

	        deckCard.deckCount -= 1;

	        if (deckCard.deckCount == 0) {

	            var index = deckData.currentDeck.cards.indexOf(deckCard);
	            deckData.currentDeck.cards.splice(index, 1);
	        }

	        deckData.currentDeck.stats = deckStatsService.calcDeckStats(deckData.currentDeck.cards);
	        
	        deckData.saveDeck(deckData.currentDeck);
	    }


	    function loadDeck (key) {

	    	deckData.currentDeck = firebaseService.getDeck(key);
	    	deckData.currentDeck.cards = deckData.currentDeck.cards || [];
	    }
	    
	}
	
})();