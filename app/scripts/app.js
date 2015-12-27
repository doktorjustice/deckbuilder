'use strict';

(function(){

     /**
      * Main module of the app
      * @type {angular module}
      */
    var app = angular.module('hearthstoneApp', 
        [
        'ngRoute',
        'firebase'
        ]);

    /**
     * Config function of the app for routing
     */
    app.config(['$routeProvider', function ($routeProvider) {
        
        $routeProvider
        .when('/', {
            templateUrl: 'views/decklist.html',
            controller: 'DeckListCtrl',
            controllerAs: 'decklist'
        })
        .when('/create', {
            templateUrl: 'views/create.html',
            controller: 'DeckCreateCtrl',
            controllerAs: 'create'
        })
        .when('/search', {
            templateUrl: 'views/search.html',
            controller: 'SearchCtrl',
            controllerAs: 'search'
        })
        .when('/deck', {
            templateUrl: 'views/deck.html',
            controller: 'DeckOverviewCtrl',
            controllerAs: 'overview'
        })
        .otherwise({
            redirectTo: '/'
        });

    }]);


    // SERVICES
    
    /**
     * Service for Firebase connection and data handling
     * @return {singleton object}           
     */
    app.factory('firebaseService', ['$firebaseArray', '$firebaseObject', function ($firebaseArray, $firebaseObject) {

        var obj = {};

        var ref = new Firebase('https://hsdeck.firebaseio.com');

        obj.decks = $firebaseArray(ref.child('/decks'));
        obj.cardIndex = $firebaseObject(ref.child('/cards'));

        obj.saveNewDeck = function (newData) {

            return obj.decks.$add(newData)
        }

        obj.saveEditedDeck = function (deck) {

            return obj.decks.$save(deck)
        }

        obj.getRecord = function (key) {

            return obj.decks.$getRecord(key)
        }

        obj.addCards = function (card) {

            return obj.cardIndex.$add()
        }


        return obj;
    }])

    /**
     * Service for commmucation w/ Heartstone API
     * @return {service object}        
     */
    app.factory('apiService', ['$http', function ($http) {
        
        var baseURL = "https://omgvamp-hearthstone-v1.p.mashape.com/"
        var headers = {'X-Mashape-Key': "D94SomjgvWmshNYKwkSCY7SDlQyVp1BA1i5jsnvOD76f0PaOxG"};
        var url = '';
        var params = {
            collectible: 1,
        }

        var getGeneralInfo = function () {

            url = baseURL + "info";

            return $http({
                method: "GET",
                url: url,
                headers: headers,
            })   
        };

        var getCardsByClass = function (name) {

            url = baseURL + "cards/classes/" + name; 
            
            return $http({
                method: "GET",
                url: url,
                headers: headers,
                params: params
            })   
        }

        var getAllCards  = function() {

            url = baseURL + "cards";

            return $http({
                method: "GET",
                url: url,
                headers: headers,
                params: params
            }) 
        }


        return {
            getGeneralInfo: getGeneralInfo,
            getCardsByClass: getCardsByClass,
            getAllCards: getAllCards
        };
    }])


    app.factory('cardData', ['apiService', '$q', function (apiService, $q) {

        var cardData = {};

        cardData.cards = []; 
        cardData.types = []; 
        cardData.classes = [];
        cardData.sets = [
            "Basic",
            "Classic",
            "Naxxramas",
            "Goblins vs Gnomes",
            "The Grand Tournament",
            "The League of Explorers"
        ];


        /**
         * Load basic information from Hearthstone API
         * and populate player class and card types arrays.
         */
        apiService.getGeneralInfo()
        .then(function (response) {

            cardData.classes = response.data.classes;
            cardData.types = response.data.types;

        })
        .catch(function (error) {
            console.error(error);
        });


        /**
         * Get cards from Hearthstone API for selected class and neutrals
         * @param  {string} playerClass Selected player class
         * @return {none}             
         */
        cardData.fetchCards = function (playerClass) {

            // Empty cards array 
            cardData.cards = [];

            return $q.resolve(
                $q.all([ apiService.getCardsByClass(playerClass), apiService.getCardsByClass('Neutral') ])
                .then(function (response) {

                    cardData.cards = response[0].data.concat(response[1].data);
                })
            )
        }


        /**
         * Modify deckCount number for any given card in the cards array
         * @param  {object} thisCard  The card to find and update
         * @param  {number} increment Should be -1 or 1
         * @return {none}           
         */
        cardData.updateCardDeckCount = function (thisCard) {

            var whichCard = cardData.cards.find(function (card, index, array) {

                return card.cardId == thisCard.cardId;
            })

            if (whichCard) {

                whichCard.deckCount = thisCard.deckCount;

            } else {

                console.error("Cannot find card!");
            }
        }


        return cardData;
    }])


    /**
     * Service for decks and the currently edited deck.
     * @param  {service} firebaseService Service for Firebase operations
     * @param  {service} $location Built in AngularJS service
     * @return {object}                 Singleton object with the service methods and properties
     */
    app.factory('deckData', ['firebaseService', '$location', function (firebaseService, $location) {

        var deckData = {};

        deckData.decks = firebaseService.decks;
        deckData.currentDeck = {};


        deckData.generateDeckName = function (className) {

            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();

            var name = className + ' / ' + year + '-' + month + '-' + day;

            return name;
        }


        deckData.createDeck = function (deckName, playerClass, cards) {

            var newDeck = {
                deckName: deckName, 
                playerClass: playerClass,
                cards: cards || [],
            };

            firebaseService.saveNewDeck(newDeck)
            .then(function (response) {

                deckData.editDeck(response.key());
            })
            .catch(function (error) {

                console.error(error);
            });
        }


        deckData.editDeck = function (key) {

            deckData.currentDeck = firebaseService.getRecord(key);
            deckData.currentDeck.cards = deckData.currentDeck.cards || [];
            updateMannaCurve();

            $location.path("/search");
        }


        deckData.saveDeck = function (deck) {

            firebaseService.saveEditedDeck(deck)
            .catch(function (error) {
                console.error(error);
            })
        }


        deckData.addCardToCurrentDeck = function (newCard) {

            deckData.currentDeck.cards = deckData.currentDeck.cards || [];

            var deckCardFound = deckData.currentDeck.cards.find( function (card, index, array) {

                return card.cardId == newCard.cardId;
            })


            if (deckCardFound) {

                deckCardFound.deckCount += 1;

            } else {
     
                deckData.currentDeck.cards.push(newCard);
                newCard.deckCount = 1;
            }


            deckData.currentDeck.counter = updateDeckCounter(deckData.currentDeck.cards);

            updateMannaCurve();

            deckData.saveDeck(deckData.currentDeck);

            return deckCardFound;
        }


        deckData.removeCardFromCurrentDeck = function (deckCard) {

            deckCard.deckCount -= 1;

            if (deckCard.deckCount == 0) {

                var index = deckData.currentDeck.cards.indexOf(deckCard);
                deckData.currentDeck.cards.splice(index, 1);
            }

            deckData.currentDeck.counter = updateDeckCounter(deckData.currentDeck.cards);

            updateMannaCurve();
            
            deckData.saveDeck(deckData.currentDeck);
        }


        var updateDeckCounter = function (deck) {

            var counter = 0;

            if (deck.length) {

                angular.forEach(deck, function (card) {

                    counter += card.deckCount;
                })
            }

            return counter;
        }

        var updateMannaCurve = function () {

            deckData.currentDeck.manaCurve = {};

            deckData.currentDeck.cards.forEach(function (card) {                

                deckData.currentDeck.manaCurve[card.cost] = deckData.currentDeck.manaCurve[card.cost] + card.deckCount || card.deckCount;
            })
            
            console.log(deckData.currentDeck.manaCurve);
        }


        return deckData;
    }])


    //CONTROLLERS


    app.controller('DeckOverviewCtrl', ['deckData', function (deckData) {

        var vm = this;
        vm.deckData = deckData;

    }])

    
    app.controller('DeckListCtrl', ['deckData', function (deckData) {

        var vm = this;
        vm.deckData = deckData;

    }])


    app.controller('DeckCreateCtrl', ['cardData', 'deckData', function (cardData, deckData) {
        
        var vm = this;
        vm.deckData = deckData;
        vm.cardData = cardData;
       
        vm.form = {};

        vm.addName = function () {

            vm.form.deckName = deckData.generateDeckName(vm.form.class);
        }
    }])


    app.controller('SearchCtrl', ['cardData', 'deckData', 'apiService', function (cardData, deckData, apiService) {

        var vm = this;

        vm.cardData = cardData;
        vm.deckData = deckData;

        vm.form = {};
        vm.form.set = "Basic";

        cardData.fetchCards(deckData.currentDeck.playerClass)
        .then(function () {

            if (deckData.currentDeck.cards.length) {

                deckData.currentDeck.cards.forEach(function (deckCard,index,array) {

                    cardData.updateCardDeckCount(deckCard);
                })
            }
        })
        .catch(function (error) {
            console.error(error);
        });


        /**
         * Add card from card pool to deck and update deck count in card pool
         * @param {object} card The card to add to deck
         */
        vm.addCard = function (card) {

            card.deckCount = card.deckCount || 0;
            
            // Check deck limits before adding card
            if (deckData.currentDeck.counter < 30 && card.deckCount < 2) {

                // Add and return the new card in the deck if it was already added
                var newCard = deckData.addCardToCurrentDeck(card);

                if (newCard) {

                    // Update the card  in pool with deck count
                    // if it was already added before
                    cardData.updateCardDeckCount(newCard);
                }

            } else if (deckData.currentDeck.counter = 30) {

                console.log("Deck is full!")
                
            } else {

                console.log("You already added two of this card!")
            }
        }

        /**
         * Remove card from deck and update deck count in card pool
         * @param  {object} card The card to remove
         * @return {none}      
         */
        vm.removeCard = function (card) {

            deckData.removeCardFromCurrentDeck(card);
            cardData.updateCardDeckCount(card);
        }
    }]);


    app.controller('CardCtrl', ['deckData', function (deckData) {

        //..

    }]);


    //FILTERS


    app.filter('class', function () {
        return function(cardArray, className) {

            cardArray = cardArray || [];
            var filteredCardArray = [];

            // Filter out Promotion and Hero cards, where playerClass is
            // missing add 'Neutral' as class
            angular.forEach(cardArray, function (card) {

                if (card.cardSet !== 'Promotion' && card.type !== 'Hero') {

                    card.playerClass = card.playerClass || 'Neutral';
                    filteredCardArray.push(card); 
                }

            });

            // If player class is added then filter out other classes
            if (className) {

                var newFilteredArray = [];

                angular.forEach(filteredCardArray, function (card) {

                    if (card.playerClass == className) {
                        newFilteredArray.push(card);
                    }

                })

                filteredCardArray = newFilteredArray;
            }

            return filteredCardArray;
        }
    })


    app.filter('set', function () {
        return function (cardArray, setName) {

            cardArray = cardArray || [];
            var filteredCardArray = [];

            angular.forEach(cardArray, function (card) {

                if (card.cardSet !== 'Promotion' && card.type !== 'Hero') {

                    card.playerClass = card.playerClass || 'Neutral';
                    filteredCardArray.push(card); 
                }

            });

            if (setName) {

                var newFilteredArray = [];

                angular.forEach(filteredCardArray, function (card) {

                    if (card.cardSet == setName) {
                        newFilteredArray.push(card);
                    }

                })

                filteredCardArray = newFilteredArray;
            }

            return filteredCardArray;
        }
    })


    // DIRECTIVES
    

    app.directive('hearthstoneCard', [function () {
        
        var link = function (scope, element, attrs) {
            //...
        }


        return {
            restrict: 'E',
            scope: {
                card: '=',
            },
            templateUrl: 'partials/card.html',
            controller: 'CardCtrl',
            controllerAs: 'cardCtrl',
            link: link
        }
    }])

})();
