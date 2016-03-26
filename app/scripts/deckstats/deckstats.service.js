(function () {

	'use strict';

	
	angular
		.module('deckBuilder')
		.factory('deckStatsService', deckStatsService)


	deckStatsService.$inject = [];


	function deckStatsService () {


		return deckStatsService = {
			calcDeckStats: calcDeckStats,
		};


		function calcDeckStats (cards) {

			// 0) Card count - OK
			// 1) Mana curve - OK
			// 2) Type distribution - OK
			// 3) Gem distribution - OK
			// 4) Neutral/Class cards
			// 5) Special abilities - OK
			// 		Taunt
			// 		Battlecry
			// 		Deathrattle
			// 		Inspire
			// 9) Races
			
			var stats = {};

			stats.count = updateCardCount(cards);
			stats.mana = updateManaCurve(cards);
			stats.type = updateTypeStat(cards);
			stats.gems = updateRarityStats(cards);
			stats.abilities = updateAbilities(cards);

			return stats;
		}


		function updateCardCount (cards) {

			return cards.reduce(function (prev, cur) {

				return prev + cur.deckCount;

			}, 0)
		}


		function updateManaCurve (cards) {

			var manaArray = [],
				manaCurve = {};

			cards.forEach(function (card) {
				
				card.cost > 6 ? card.cost = 7 : card.cost = card.cost;

				manaArray[card.cost] ? 
					manaArray[card.cost] += card.deckCount : 
					manaArray[card.cost] = card.deckCount ;
			})

			for (var i = 0; i < 7; i++) {

				manaCurve[i] = manaArray[i] || 0;
			}

			manaCurve['7+'] = manaArray[7] || 0;

			return manaCurve;
		}


		function updateTypeStat (cards) {

			var data = {};

			cards.forEach(function (card) {

				data[card.type] ? data[card.type] += 1 : data[card.type] = 1;
			})

			return data;
		}


		function updateRarityStats (cards) {

			var data = {};

			cards.forEach(function (card) {

				data[card.rarity] ? data[card.rarity] += 1 : data[card.rarity] = 1;
			})

			return data;
		}


		function updateAbilities (cards) {

			var abilities = [
				'Taunt',
				'Battlecry',
				'Inspire',
				'Deathrattle',
				'Charge',
				'Divine Shied',
				'Windfury',
				];

			var	data = {};

			cards.forEach( function (card) {

				if (card.mechanics) {

					angular.forEach(card.mechanics, function (value, key) {

						var foundAbility = abilities.find(function (ability) {

								return value.name == ability;

							})

						if (foundAbility) {

							data[value.name] = data[value.name] + 1 || 1;	
						}
					});
				}
			})

			return data;
		}
	}

})();