(function () {

	'use strict';


	angular
		.module('deckBuilder')
		.controller('EditorCtrl', EditorCtrl)


	EditorCtrl.$inject = ['$scope', 'cardData', 'deckData', 'cardSearch'];


	function EditorCtrl ($scope, cardData, deckData, cardSearch) {

	    var vm = this;

	    vm.cardData = cardData;
	    vm.deckData = deckData;
	    vm.cardSearch = cardSearch;

	    vm.addCard = addCard;


	    //Populate card data and update counts
	    cardData.preloadCards()
	    .then(function (response) {
	    	cardData.cards = response;
	    	updateDeckCounts(deckData.currentDeck.cards);
	    })
	    .catch(function (error) {
	    	console.error(error);
	    })


	    // Clear deckCount on cards if user changes deck in nav dropdown
	    $scope.$watch('editor.deckData.currentDeck.$id', function(prev, cur) {

	    	updateDeckCounts(vm.deckData.cards);
	    })


	    function updateDeckCounts (deck) {
	    	
	    	var x = deck || [];

	    	cardData.cards.forEach(function(card) {

	    		card.deckCount = 0;
	    	})

	    	if (x.length) {

	    		deck.forEach(function (deckCard) {

	    	    	cardData.updateCardDeckCount(deckCard, cardData.cards);
	    	    })
	    	}
	   	}

	    
	    function addCard (card) {

	        card.deckCount = card.deckCount || 0;
	        
	        try {

	        	var newCard = deckData.addCardToCurrentDeck(card);
	        
	        } catch (error) {

	        	console.error(error);
	        }

	        if (newCard) {

	            cardData.updateCardDeckCount(newCard, cardData.cards);
	        }
	    }

	}

})();