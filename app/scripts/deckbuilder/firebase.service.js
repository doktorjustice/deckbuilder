'use strict';

(function () {


	angular
		.module('Deckbuilder')
		.factory('firebaseService', firebaseService)


	firebaseService.$inject = ['$firebaseArray', '$firebaseObject']


	function firebaseService ($firebaseArray, $firebaseObject) {

	    var ref = new Firebase('https://hsdeck.firebaseio.com');

	    var firebaseService = {};

	    firebaseService.decks = $firebaseArray(ref.child('/decks'));

	    firebaseService.saveNewDeck = function (newData) {

	        return firebaseService.decks.$add(newData)
	    }

	    firebaseService.saveEditedDeck = function (deck) {

	        return firebaseService.decks.$save(deck)
	    }

	    firebaseService.getDeck = function (key) {

	        return firebaseService.decks.$getRecord(key)
	    }

	    return firebaseService;
	}

})();
