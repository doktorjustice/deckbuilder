(function () {

	'use strict';


	angular
		.module('deckBuilder')
		.factory('firebaseService', firebaseService)


	firebaseService.$inject = ['$firebaseArray', '$firebaseObject']


	function firebaseService ($firebaseArray, $firebaseObject) {


	    var ref = new Firebase('https://hsdeck.firebaseio.com'),
	    	decks = $firebaseArray(ref.child('/decks'));


	    return {
	    	decks: decks,
	    	saveNewDeck: saveNewDeck,
	    	saveEditedDeck: saveEditedDeck,
	    	getDeck: getDeck,
	    	removeDeck: removeDeck
	    };


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
