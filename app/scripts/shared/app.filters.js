'use strict';

(function () {


	angular
		.module('AppCore')
		.filter('class', classFilter)
		.filter('set', setFilter)
		.filter('type', typeFilter)


	function classFilter () {

		/**
		 * Filter cards for a given player class
		 * @param  {array} cardArray The array to be filtered
		 * @param  {string} className The player class to filter
		 * @return {array}           Filtered array
		 */
	    return function (cardArray, className) {

	        cardArray = cardArray || [];
	        var filteredCardArray = [];


	        if (className) {

	        	cardArray.forEach(function (card) {

	        		if (card.playerClass == className) {

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

})();