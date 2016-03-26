(function () {

	'use strict';


	angular
		.module('appCore')
		.filter('class', classFilter)
		.filter('set', setFilter)
		.filter('type', typeFilter)
		.filter('gem', gemFilter)


	function classFilter () {

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