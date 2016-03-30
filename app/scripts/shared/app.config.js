(function () {

    'use strict';
    

    angular
        .module('appCore')
        .config(routeConfig)
        .config(fbRef)
        .constant('FirebaseUrl', 'https://hsdeck.firebaseio.com/');


    routeConfig.$inject = ['$routeProvider'];
    fbRef.$inject = ['$firebaseRefProvider', 'FirebaseUrl'];


    function routeConfig($routeProvider) {

        $routeProvider
        .when('/dashboard', {
            templateUrl: 'templates/dashboard.html',
            controller: 'DashboardCtrl',
            controllerAs: 'dashboard',
            resolve: {
                listLoaded: function (deckData) {

                    return deckData.decksLoaded();
                }
            }
        })
        .when('/create', {
            templateUrl: 'templates/create.html',
            controller: 'DeckCreateCtrl',
            controllerAs: 'create'
        })
        .when('/editor', {
            templateUrl: 'templates/editor.html',
            controller: 'EditorCtrl',
            controllerAs: 'editor'
        })
        .when('/stats', {
            templateUrl: 'templates/stats.html',
            controller: 'StatsOverviewCtrl',
            controllerAs: 'stats'
        })
        .when('/search', {
            templateUrl: 'templates/search.html',
            controller: 'CardSearchCtrl',
            controllerAs: 'search'
        })
        .otherwise({
            redirectTo: '/dashboard'
        });
    }


    function fbRef ($firebaseRefProvider, FirebaseUrl) {

        $firebaseRefProvider.registerUrl({
            default: FirebaseUrl,
            decks: FirebaseUrl + 'decks'
        });
    }

})();