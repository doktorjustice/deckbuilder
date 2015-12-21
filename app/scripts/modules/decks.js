'use strict';

(function(){

	var app = angular.module('decks', ['ngRoute']);

	app.config(function ($routeProvider) {
	    $routeProvider
	    .when('/decks', {
	        templateUrl: 'views/decks.html',
	        controller: 'DeckCtrl',
	        controllerAs: 'DeckCtrl'
	    })
	});

	app.controller('DeckCtrl', ['deckData', function (deckData){

		var vm = this;

		vm.deck = deckData.cards;
		vm.deckInfo = deckData.deckInfo;

	}])

})();