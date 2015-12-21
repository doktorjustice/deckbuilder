'use strict';

(function(){

    var firebaseRef = new Firebase('https://deckstat.firebaseio.com/');

    var app = angular.module('hearthstoneApp', ['ngRoute', 'decks']);


    app.config(function ($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
        })
        .otherwise({
            redirectTo: '/'
        });
    })


    app.factory('apiService', ['$http', function ($http){
        
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


    app.factory('cardData', ['apiService', function (apiService) {

        var data = {};

        data.cards = []; 
        data.types = []; 
        data.classes = [];
        data.sets = [
            "Basic",
            "Classic",
            "Naxxramas",
            "Goblins vs Gnomes",
            "The Grand Tournament",
            "The League of Explorers"
        ];
        data.isNeutralListLoaded = false;
        data.classesLoaded = [];

        apiService.getGeneralInfo()
        .then(function (response) {

            data.classes = response.data.classes;
            data.types = response.data.types;

        })
        .catch(function (error) {

            console.error(error);

        });

        //Check if a given class' cardlist is already loaded
        var checkClassLoadState = function (newClass) {

            var loaded = false; 

            angular.forEach(data.classesLoaded, function (thisClass) {

                if (newClass == thisClass) {

                    loaded = true;
                }
            })

            return loaded;
        }

        return {
            data: data,
            checkClassLoadState: checkClassLoadState
        }

    }])


    app.factory('deckData', [function(){
        
        var deckInfo = {};
        deckInfo.counter = 0;

        var cards = [];
        var deckClass = '';

        var addCard = function (card) {
            cards.push(card);
            deckInfo.counter += 1;
            console.log(deckInfo.counter);
        }

        return {
            cards: cards,
            addCard: addCard,
            deckClass: deckClass,
            deckInfo: deckInfo
        };
    }])


    app.controller('MainCtrl', ['cardData', 'deckData', 'apiService', function (cardData, deckData, apiService) {

        var vm = this;

        //Bind card data service
        vm.data = cardData.data;

        //Bind deck data service
        vm.deck = deckData.cards;

        //Set form initial values
        vm.form = {};
        vm.form.set = "Basic";

        //Set form to the class if it was selected earlier
        vm.form.class = deckData.deckClass;

        vm.getCards = function (playerClass) {

            //Save the class into deck service
            deckData.deckClass = playerClass;

            var loaded = cardData.checkClassLoadState(playerClass);

            console.log(playerClass + ' is loaded: ' + loaded);

            //Check if the class is already loaded
            if (!loaded) {

                //Fetch the cards of the chosen class
                apiService.getCardsByClass(playerClass)

                .then(function (response) {

                    //Concat card array with new cards
                    vm.data.cards = vm.data.cards.concat(response.data);

                    //Add current class to the loaded list
                    vm.data.classesLoaded.push(playerClass);

                    //Fetch Neutral cards if they aren't loaded yet
                    if (!vm.data.isNeutralListLoaded) {

                        return apiService.getCardsByClass('Neutral');
                    }
                })
                .then(function (response) {

                    if (response) {

                        //Concat card array with new cards
                        vm.data.cards = vm.data.cards.concat(response.data);

                        //Indicate that Neutral cards are loaded
                        vm.data.isNeutralListLoaded = true;
                    }
                })
                .catch(function (error) {
                    console.error(error);
                });
            }
        }

    }]);


    app.controller('CardsCtrl', ['deckData', function (deckData) {

        var vm = this;

        vm.addCardToDeck = function (card) {

            deckData.addCard(card);
        }
    }]);


    app.filter('class', function () {
        return function(cardArray, className) {

            cardArray = cardArray || [];
            var filteredCardArray = [];

            angular.forEach(cardArray, function (card) {

                if (card.cardSet !== 'Promotion' && card.type !== 'Hero') {

                    card.playerClass = card.playerClass || 'Neutral';
                    filteredCardArray.push(card); 
                }

            });

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


    app.directive('hearthstoneCard', [function () {
        
        var link = function (scope, element, attrs) {

        }


        return {
            restrict: 'E',
            scope: {
                card: '=',
            },
            templateUrl: 'views/card.html',
            controller: 'CardsCtrl',
            controllerAs: 'cards',
            link: link
        }
    }])

})();
