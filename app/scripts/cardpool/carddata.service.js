'use strict';

/**
 * Handle card pool downloaded from card API
 * @return {none} 
 */
(function() {


	angular
		.module('Cardpool')
		.factory('cardPool', cardPool);


	cardPool.$inject = ['cardApiService', '$q', 'setFilter'];


	function cardPool(cardApiService, $q, setFilter) {

		var cardPool = {};

		cardPool.cards = []; 

		cardPool.types = [
			"Minion",
			"Spell",
			"Weapon"
		];

		cardPool.playerClasses = [
			"Druid",
			"Hunter",
			"Mage",
			"Paladin",
			"Priest",
			"Rogue",
			"Shaman",
			"Warlock",
			"Warrior",
		];
		
		cardPool.sets = [
		    "Basic",
		    "Classic",
		    "Naxxramas",
		    "Goblins vs Gnomes",
		    "The Grand Tournament",
		    "The League of Explorers"
		];
		
		cardPool.races = [
			"Demon",
			"Dragon",
			"Mech",
			"Murloc",
			"Beast",
			"Pirate",
			"Totem"
		]

		cardPool.rarities = [
			"Free",
			"Common",
			"Rare",
			"Epic",
			"Legendary"
		]


		/**
		 * Get cards from Hearthstone API for selected class and neutrals
		 * @param  {string} playerClass Selected player class
		 * @return {none}             
		 */
		cardPool.fetchCards = function (playerClass) {

		    cardPool.cards = [];

		    return $q.resolve(
		        $q.all([
		        	cardApiService.getCardsByClass(playerClass), 
		        	cardApiService.getCardsByClass('Neutral') 
		        ])
		        .then(function (response) {

		            var tempCards = response[0].data.concat(response[1].data);

		            tempCards.forEach(function (card) {
	
						card.playerClass = card.playerClass || 'Neutral';

		            })

		            cardPool.cards = setFilter(tempCards, cardPool.sets)
		        })
		    )
		}



		/**
		 * Update deckCount number for any given card in the cards array
		 * @param  {object} thisCard  The card to find and update
		 * @return {none}           
		 */
		cardPool.updateCardDeckCount = function (thisCard) {

		    var whichCard = cardPool.cards.find(function (card, index, array) {

		        return card.cardId == thisCard.cardId;
		    })

		    if (whichCard) {

		        whichCard.deckCount = thisCard.deckCount;

		    } else {

		        console.error("Cannot find card!");
		    }
		}


		return cardPool;
	}

})();