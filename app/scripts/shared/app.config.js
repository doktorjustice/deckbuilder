(function () {

    'use strict';
    

    angular
        .module('appCore')
        .config(routeConfig);

    routeConfig.$inject = ['$routeProvider', '$locationProvider'];

    function routeConfig($routeProvider) {

        $routeProvider
        .when('/dashboard', {
            templateUrl: 'templates/dashboard.html',
            controller: 'DashboardCtrl',
            controllerAs: 'dashboard'
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

})();