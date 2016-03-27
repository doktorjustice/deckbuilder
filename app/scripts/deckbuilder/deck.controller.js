(function () {

	'use strict';

	angular
		.module('deckBuilder')
		.controller('Deck', Deck)

	Deck.$inject = ['deckData', 'cardData'];

	function Deck (deckData, cardData) {

		var vm = this;
		vm.removeCard = removeCard;

		function removeCard (card) {

		    deckData.removeCardFromCurrentDeck(card);
		    cardData.updateCardDeckCount(card, cardData.cards);
		}	}

})();