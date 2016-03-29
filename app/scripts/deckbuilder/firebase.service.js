(function () {

	'use strict';


	angular
		.module('deckBuilder')
		.factory('firebaseService', firebaseService)


	firebaseService.$inject = ['$firebaseRef', '$firebaseArray', '$firebaseObject']


	function firebaseService ($firebaseRef, $firebaseArray, $firebaseObject) {


	    // var ref = new Firebase('https://hsdeck.firebaseio.com'),
	    var	decks = $firebaseArray($firebaseRef.decks);

	    return {
	    	decks: decks,
	    	saveNewDeck: saveNewDeck,
	    	saveEditedDeck: saveEditedDeck,
	    	getDeck: getDeck,
	    	removeDeck: removeDeck,
	    	deckListLoaded: deckListLoaded
	    };


	    function deckListLoaded () {

	    	return decks.$loaded()
	    }


	    function saveNewDeck (newData) {

	        return decks.$add(newData);
	    }


	    function saveEditedDeck (deck) {

	        return decks.$save(deck);
	    }


	    function getDeck (key) {

	        return decks.$getRecord(key);
	    }


	    function removeDeck (deck) {

	    	return decks.$remove(deck);
	    }
	}

})();
