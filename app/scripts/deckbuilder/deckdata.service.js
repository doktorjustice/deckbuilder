(function () {

	'use strict';


	angular
		.module('deckBuilder')
		.factory('deckData', deckData);


	deckData.$inject = ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', 'deckStatsService'];


	function deckData ($firebaseArray, $firebaseObject, FirebaseUrl, deckStatsService) {


		return deckData = {
			decks : [],
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

	    	var created = new Date();

	        var newDeck = {
	            deckName: deckName,
	            hero: hero,
	            playerClass: hero.playerClass,
	            cards: cards || [],
	            created: created.getTime(),
	        };


	        deckData.decks.$add(newDeck)
	        .then(function (response) {

	            deckData.loadDeck(response.key());
	        })
	        .catch(function (error) {

	            console.error(error);
	        });
	    }


	    function saveDeck (deck) {

	        deckData.decks.$save(deck)
	        .then(function () {

	        	console.log("Deck saved: " + deck);
	        })
	        .catch(function (error) {

	            console.error(error);
	        })
	    }


	    function addCardToCurrentDeck (newCard) {

	        deckData.currentDeck.cards = deckData.currentDeck.cards || [];
	        deckData.currentDeck.stats = deckData.currentDeck.stats || {};
	        deckData.currentDeck.stats.count = deckData.currentDeck.stats.count || 0;


	        if (deckData.currentDeck.stats.count < 30 && newCard.deckCount < 2) {

	        	var deckCardFound = deckData.currentDeck.cards.find( function (card) {

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

	    	deckData.currentDeck = deckData.decks.$getRecord(key);
	    	deckData.currentDeck.cards = deckData.currentDeck.cards || [];
	    }


	    function removeDeck (deck) {

	    	deckData.decks.$remove(deck)
	    	.catch(function (error) {
	    	    console.error(error);
	    	})
	    }   
	}
	
})();