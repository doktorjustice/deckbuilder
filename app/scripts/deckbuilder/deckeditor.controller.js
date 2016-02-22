'use strict';

(function () {


	angular
		.module('Deckbuilder')
		.controller('EditorCtrl', EditorCtrl)


	EditorCtrl.$inject = ['cardData', 'deckData', 'cardSearch'];


	function EditorCtrl (cardData, deckData, cardSearch) {

	    var vm = this;

	    // Bind service objects
	    vm.cardData = cardData;
	    vm.deckData = deckData;
	    vm.cardSearch = cardSearch;

	    // Methods
	    vm.addCard = addCard;
	    vm.removeCard = removeCard;

	    //Populate card data and update counts
	    cardData.preloadCards()
	    .then(function (response) {
	    	cardData.cards = response;
	    	updateDeckCounts(deckData.currentDeck.cards);
	    })
	    .catch(function (error) {
	    	console.error(error);
	    })


	    function updateDeckCounts (deck) {
	    	
	    	var x = deck || [];

	    	if (x.length) {

	    		deck.forEach(function (deckCard) {

	    	    	cardData.updateCardDeckCount(deckCard, cardData.cards);
	    	    })
	    	}
	   	}


	    /**
	     * Add card from card pool to deck and update deck count in card pool
	     * @param {object} card The card to add to deck
	     */
	    function addCard (card) {

	        card.deckCount = card.deckCount || 0;
	        deckData.currentDeck.counter = deckData.currentDeck.counter || [];

	        // Check deck limits before adding card
	        if (deckData.currentDeck.counter < 30 && card.deckCount != 2) {

	            // Add and return the new card in the deck if it was already added
	            var newCard = deckData.addCardToCurrentDeck(card);

	            if (newCard) {

	                // Update the card in pool with deck count
	                // if it was already added before
	                cardData.updateCardDeckCount(newCard, cardData.cards);
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
	    function removeCard (card) {

	        deckData.removeCardFromCurrentDeck(card);
	        cardData.updateCardDeckCount(card, cardData.cards);
	    }
	}

})();