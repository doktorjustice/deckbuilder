'use strict';

(function () {

    angular
        .module('AppCore')
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
            controllerAs: 'overview'
        })
        .otherwise({
            redirectTo: '/dashboard'
        });
    }

})();