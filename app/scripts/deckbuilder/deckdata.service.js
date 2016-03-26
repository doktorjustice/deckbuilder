(function (){

	'use strict';


	angular
		.module('deckBuilder')
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
	    	removeDeck: removeDeck,
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

	    	// Initialize values
	        deckData.currentDeck.cards = deckData.currentDeck.cards || [];
	        deckData.currentDeck.stats = deckData.currentDeck.stats || {};
	        deckData.currentDeck.stats.count = deckData.currentDeck.stats.count || 0;

	        // Check deck count and card count limits
	        if (deckData.currentDeck.stats.count < 30 && newCard.deckCount < 2) {

	        	// Check if an instance of the card has been already added
	        	var deckCardFound = deckData.currentDeck.cards.find( function (card) {

	        	    return card.cardId == newCard.cardId;
	        	})

	        	// If the card has been added increase its counter
	        	if (deckCardFound) {

	        	    deckCardFound.deckCount += 1;

	        	// Otherwise add it with a count of 1
	        	} else {
	        	
	        	    deckData.currentDeck.cards.push(newCard);
	        	    newCard.deckCount = 1;
	        	}

	        	// Refresh deck stats
	        	deckData.currentDeck.stats = deckStatsService.calcDeckStats(deckData.currentDeck.cards);

	        	// Save deck to Firebase
	        	deckData.saveDeck(deckData.currentDeck);

	        	return deckCardFound;

	        // Throw errors if limits are reached
	        } else if (deckData.currentDeck.stats.count === 30) {

	        	throw new Error("Deck is full!");

	        } else {

	        	throw new Error("Already added two of this card");
	        }
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

	    function removeDeck (deck) {

	    	firebaseService.removeDeck(deck)
	    	.catch(function (error) {
	    	    console.error(error);
	    	})
	    }   
	}
	
})();