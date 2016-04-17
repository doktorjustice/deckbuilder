(function () {

	'use strict';


	angular
		.module('deckBuilder')
		.controller('Deck', Deck)


	Deck.$inject = ['deckData', 'cardData'];


	function Deck (deckData, cardData) {

		var vm = this;
		vm.removeCard = removeCard;
		vm.changeDeckName = changeDeckName;
		vm.editDeckName = editDeckName;
		vm.isDeckNameEdited = false;


		function removeCard (card) {

		    deckData.removeCardFromCurrentDeck(card);
		    cardData.updateCardDeckCount(card, cardData.cards);
		}


		function changeDeckName (newName) {

			if (newName !== vm.insertDeck.deckName) {

				vm.insertDeck.deckName = newName || vm.insertDeck.deckName;
				deckData.saveDeck(vm.insertDeck);
			}

			vm.isDeckNameEdited = false;
		}
		

		function editDeckName () {

			vm.isDeckNameEdited = true;
		}
	}

})();