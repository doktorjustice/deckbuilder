'use strict';

/**
 * Handle data and modification of currently selected deck
 * @return {none}
 */
(function(){


	angular
		.module('Deckbuilder')
		.factory('deckData', deckData);


		deckData.$inject = ['firebaseService', '$location'];


		/**
		 * Service for decks and the currently edited deck.
		 * @param  {service} firebaseService Service for Firebase operations
		 * @param  {service} $location Built in AngularJS service
		 * @return {object}                 Singleton object with the service methods and properties
		 */
		function deckData (firebaseService, $location) {

		    var deckData = {};

		    deckData.decks = firebaseService.decks;
		    deckData.currentDeck = {};


		    deckData.generateDeckName = function (className) {

		        var date = new Date();
		        var year = date.getFullYear();
		        var month = date.getMonth() + 1;
		        var day = date.getDate();

		        var name = className + ' / ' + year + '-' + month + '-' + day;

		        return name;
		    }


		    deckData.createDeck = function (deckName, hero, cards) {

		        var newDeck = {
		            deckName: deckName,
		            hero: hero,
		            playerClass: hero.playerClass,
		            cards: cards || [],
		        };

		        firebaseService.saveNewDeck(newDeck)
		        .then(function (response) {

		            deckData.editDeck(response.key());
		        })
		        .catch(function (error) {

		            console.error(error);
		        });
		    }


		    deckData.editDeck = function (key) {

		        deckData.currentDeck = firebaseService.getDeck(key);
		        deckData.currentDeck.cards = deckData.currentDeck.cards || [];
		        updateMannaCurve();

		        $location.path("/editor");
		    }


		    deckData.saveDeck = function (deck) {

		        firebaseService.saveEditedDeck(deck)
		        .catch(function (error) {
		            console.error(error);
		        })
		    }


		    deckData.addCardToCurrentDeck = function (newCard) {

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


		        deckData.currentDeck.counter = updateDeckCounter(deckData.currentDeck.cards);

		        updateMannaCurve();

		        deckData.saveDeck(deckData.currentDeck);

		        return deckCardFound;
		    }


		    deckData.removeCardFromCurrentDeck = function (deckCard) {

		        deckCard.deckCount -= 1;

		        if (deckCard.deckCount == 0) {

		            var index = deckData.currentDeck.cards.indexOf(deckCard);
		            deckData.currentDeck.cards.splice(index, 1);
		        }

		        deckData.currentDeck.counter = updateDeckCounter(deckData.currentDeck.cards);

		        updateMannaCurve();
		        
		        deckData.saveDeck(deckData.currentDeck);
		    }


		    var updateDeckCounter = function (deck) {

		        var counter = 0;

		        if (deck.length) {

		            angular.forEach(deck, function (card) {

		                counter += card.deckCount;
		            })
		        }

		        return counter;
		    }

		    var updateMannaCurve = function () {

		        deckData.currentDeck.manaCurve = {};

		        deckData.currentDeck.cards.forEach(function (card) {                

		            deckData.currentDeck.manaCurve[card.cost] = deckData.currentDeck.manaCurve[card.cost] + card.deckCount || card.deckCount;
		        })
		        
		    }


		    return deckData;

		}
})();