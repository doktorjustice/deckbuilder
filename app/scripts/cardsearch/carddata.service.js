(function () {

	'use strict';


	angular
		.module('cards')
		.factory('cardData', cardData);


	cardData.$inject = ['$q', 'cardApi', 'classFilter' ,'setFilter'];


	function cardData ($q, cardApi, classFilter, setFilter) {

		var cardDataObject = {};

		cardDataObject.cards = [];

		cardDataObject.types = [
			"Minion",
			"Spell",
			"Weapon"
		];

		cardDataObject.playerClasses = [
			"Neutral",
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
		
		cardDataObject.sets = [
		    "Basic",
		    "Classic",
		    "Naxxramas",
		    "Goblins vs Gnomes",
		    "The Grand Tournament",
		    "The League of Explorers"
		];
		
		cardDataObject.races = [
			"Demon",
			"Dragon",
			"Mech",
			"Murloc",
			"Beast",
			"Pirate",
			"Totem"
		];

		cardDataObject.rarities = [
			"Free",
			"Common",
			"Rare",
			"Epic",
			"Legendary"
		];

		// METHODS
		cardDataObject.fetchCards = fetchCards;
		cardDataObject.updateCardDeckCount = updateCardDeckCount;
		cardDataObject.preloadCards = preloadCards;


		// Get all cards data from API before returning service object
		preloadCards().then(setCards)
		.catch(function (error) {
			console.error(error);
		})


		return cardDataObject;



		function preloadCards () {

			if (!cardDataObject.cards.length) {

				return fetchCards(cardDataObject.playerClasses)
				
			} else {

				return $q.resolve(cardDataObject.cards)
			}
		}


		function setCards (cards) {

			cardDataObject.cards = cards;
		}


		function fetchCards (input) {
			
			var classes = [];

			Array.isArray(input) ? classes = input : classes = [input, 'Neutral'];

			return cardApi.getAllCards(classes)
			.then(extractCardArray)
			.then(addNeutralClass)
			.then(filterCards)
			.catch(errorLogger)
		}


		function extractCardArray (response) {

			var mappedArray = mapResponseData(response);

			var flatArray = flattenArray(mappedArray);

			return flatArray;
		}


		function mapResponseData (arrayOfObjects) {

			return arrayOfObjects.map(function (object) {

				return object.data;
			})
		}


		function flattenArray (array) {

			return array.reduce(concatArrays);
		}


		function concatArrays (arr1, arr2) {

			return arr1.concat(arr2);
		}


		function addNeutralClass (cardArray) {

			cardArray.forEach(function (card) {

				card.playerClass = card.playerClass || 'Neutral';
			})

			return cardArray;
		}


		function filterCards (array) {

	    	return setFilter(array, cardDataObject.sets);
		}	

		
		function errorLogger (error) {

			console.log(error);
		}


		function updateCardDeckCount (thisCard, cardCollection) {

		    var whichCard = cardCollection.find(function (card, index, array) {

		        return card.cardId == thisCard.cardId;
		    })

		    if (whichCard) {

		        whichCard.deckCount = thisCard.deckCount;

		    } else {

		        console.error("Cannot find card!");
		    }
		}
	}

})();