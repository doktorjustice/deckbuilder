(function () {

    'use strict';
    

    angular
        .module('appCore')
        .config(routeConfig)
        .config(fbRef)
        .constant('FirebaseUrl', 'https://hsdeck.firebaseio.com/')
        .run(noAuthRouting);


    routeConfig.$inject = ['$routeProvider'];

    fbRef.$inject = ['$firebaseRefProvider', 'FirebaseUrl'];
    
    noAuthRouting.$inject = ['$rootScope', '$location'];


    function routeConfig($routeProvider) {

        $routeProvider
        .when('/dashboard', {
            templateUrl: 'templates/dashboard.html',
            controller: 'DashboardCtrl',
            controllerAs: 'dashboard',
            resolve: {
                userData: function ($firebaseAuthService, authService) {

                    return $firebaseAuthService.$requireAuth()
                    .then(function (user) {

                        return authService.getUser(user.uid);
                    });
                },
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
        .when('/login', {
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'login'
        })
        .otherwise({
            redirectTo: '/dashboard'
        });
    }


    function fbRef ($firebaseRefProvider, FirebaseUrl) {

        $firebaseRefProvider.registerUrl({
            default: FirebaseUrl,
            decks: FirebaseUrl + 'decks',
            users: FirebaseUrl + 'users',
        });
    }


    function noAuthRouting ($rootScope, $location) {

        $rootScope.$on("$routeChangeError", function (event, next, previous, error) {

            if (error == 'AUTH_REQUIRED') {

                $location.path("/login");
            }
        });
    };

})();