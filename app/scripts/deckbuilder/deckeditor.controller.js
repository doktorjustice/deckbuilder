'use strict';

(function () {


	angular
		.module('Deckbuilder')
		.controller('EditorCtrl', EditorCtrl)


	EditorCtrl.$inject = ['cardPool', 'deckData'];


	function EditorCtrl (cardPool, deckData) {

	    var vm = this;

	    vm.cardPool = cardPool;
	    vm.deckData = deckData;

	    vm.form = {};
	    vm.form.set = ["Basic"];

	    cardPool.fetchCards(deckData.currentDeck.playerClass)
	    .then(function () {

	        if (deckData.currentDeck.cards.length) {

	            deckData.currentDeck.cards.forEach(function (deckCard,index,array) {

	                cardPool.updateCardDeckCount(deckCard);
	            })
	        }
	    })
	    .catch(function (error) {
	        console.error(error);
	    });


	    /**
	     * Add card from card pool to deck and update deck count in card pool
	     * @param {object} card The card to add to deck
	     */
	    vm.addCard = function (card) {

	        card.deckCount = card.deckCount || 0;
	        deckData.currentDeck.counter = deckData.currentDeck.counter || [];

	        // Check deck limits before adding card
	        if (deckData.currentDeck.counter < 30 && card.deckCount != 2) {

	            // Add and return the new card in the deck if it was already added
	            var newCard = deckData.addCardToCurrentDeck(card);

	            if (newCard) {

	                // Update the card in pool with deck count
	                // if it was already added before
	                cardPool.updateCardDeckCount(newCard);
	            }

	        } else if (deckData.currentDeck.counter == 30) {

	            console.log("Deck is full!");

	        } else {

	            console.log("You already added two of this card!");

	        }
	    }

	    /**
	     * Remove card from deck and update deck count in card pool
	     * @param  {object} card The card to remove
	     * @return {none}      
	     */
	    vm.removeCard = function (card) {

	        deckData.removeCardFromCurrentDeck(card);
	        cardPool.updateCardDeckCount(card);
	    }
	}

})();