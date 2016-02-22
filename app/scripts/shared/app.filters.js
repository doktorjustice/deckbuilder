'use strict';

(function () {


	angular
		.module('AppCore')
		.filter('class', classFilter)
		.filter('set', setFilter)
		.filter('type', typeFilter)
		.filter('gem', gemFilter)


	function classFilter () {

		/**
		 * Filter cards by player classes
		 * @param  {array} cardArray The array to be filtered
		 * @param  {array} classArray  Array of card sets to filter
		 * @return {array}           Filtered array
		 */
	    return function (cardArray, classArray) {

	        cardArray = cardArray || [];
	        
	        var filteredCardArray = [];

	        if (typeof classArray == 'string') {

	        	var string = classArray;

	        	classArray = [];

	        	classArray.push(string);
	        }

	        if (classArray) {

	        	cardArray.forEach(function (card) {

	        		var checkClass = classArray.find(function (playerClass) {

	        			return card.playerClass == playerClass;
	        		})

	        		if (checkClass) {

	        			filteredCardArray.push(card);
	        		}
	        	})
	        }

	        return filteredCardArray;
	    }
	}



	function setFilter () {

		/**
		 * Filter cards by card sets
		 * @param  {array} cardArray The array to be filtered
		 * @param  {array} setArray  Array of card sets to filter
		 * @return {array}           Filtered array
		 */
	    return function (cardArray, setArray) {

	        cardArray = cardArray || [];
	        var filteredCardArray = [];

	        if (setArray) {

	        	cardArray.forEach(function (card) {

	        		var checkSet = setArray.find(function (set) {

	        			return card.cardSet == set;
	        		})

	        		if (checkSet) {

	        			filteredCardArray.push(card);
	        		}
	        	})
	        }

	        return filteredCardArray;
	    }
	}



	function typeFilter () {

		/**
		 * Filter cards by card types
		 * @param  {array} cardArray The array to be filtered
		 * @param  {array} typeArray  Array of card types to filter
		 * @return {function}           Filter function
		 */
	    return function (cardArray, typeArray) {

	        cardArray = cardArray || [];
	        var filteredCardArray = [];

	        if (typeArray) {

	        	cardArray.forEach(function (card) {

	        		var checkType = typeArray.find(function (type) {

	        			return card.type == type;
	        		})

	        		if (checkType) {

	        			filteredCardArray.push(card);
	        		}
	        	})
	        }

	        return filteredCardArray;
	    }
	}

	function gemFilter () {

		/**
		 * Filter cards by card rarity
		 * @param  {array} cardArray The array to be filtered
		 * @param  {array} gemArray  Array of card types to filter
		 * @return {function}           Filter function
		 */
	    return function (cardArray, gemArray) {

	        cardArray = cardArray || [];
	        var filteredCardArray = [];

	        if (gemArray) {

	        	cardArray.forEach(function (card) {

	        		var checkGem = gemArray.find(function (rarity) {

	        			return card.rarity == rarity;
	        		})

	        		if (checkGem) {

	        			filteredCardArray.push(card);
	        		}
	        	})
	        }

	        return filteredCardArray;
	    }
	}

})();