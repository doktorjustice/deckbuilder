(function() {

	'use strict';


	angular
		.module('appCore')
		.config(routeConfig)
		.config(fbRef)
		.constant('FirebaseUrl', 'https://hsdeck.firebaseio.com/')
		.run(noAuthRouting);


	routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

	fbRef.$inject = ['$firebaseRefProvider', 'FirebaseUrl'];

	noAuthRouting.$inject = ['$rootScope', '$state'];


	function routeConfig($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/dashboard');

		$stateProvider
		.state('app', {
			abstract: true,
			url: '',
			views: {
				navigation: {
					templateUrl: 'templates/navigation.html',
					controller: 'NavigationController',
					controllerAs: 'navigation'
				},
				content: {
					template: '<ui-view></ui-view>',
				}
			},
			resolve: {
				auth: function ($firebaseAuthService) {

					return $firebaseAuthService.$requireAuth();
				},
			},
		})
		.state('app.dashboard', {
			url: '/dashboard',
			templateUrl: 'templates/dashboard.html',
			controller: 'DashboardCtrl',
			controllerAs: 'dashboard',
		})
		.state('app.create', {
			url: '/create',
			templateUrl: 'templates/create.html',
			controller: 'DeckCreateCtrl',
			controllerAs: 'create'
		})
		.state('app.edit', {
			url: '/editor',
			templateUrl: 'templates/editor.html',
			controller: 'EditorCtrl',
			controllerAs: 'editor'
		})
		.state('app.stats', {
			url: '/stats',
			templateUrl: 'templates/stats.html',
			controller: 'StatsOverviewCtrl',
			controllerAs: 'stats'
		})
		.state('app.search', {
			url: '/search',
			templateUrl: 'templates/search.html',
			controller: 'CardSearchCtrl',
			controllerAs: 'search'
		})
		.state('login', {
			url: '/login',
			views: {
				navigation: {
					templateUrl: 'templates/navigation.html',
				},
				content: {
					templateUrl: 'templates/login.html',
					controller: 'LoginCtrl',
					controllerAs: 'login'
				}
			}
		})
	}


	function fbRef ($firebaseRefProvider, FirebaseUrl) {

	    $firebaseRefProvider.registerUrl({
	        default: FirebaseUrl,
	        decks: FirebaseUrl + 'decks',
	        users: FirebaseUrl + 'users',
	    });
	}


	function noAuthRouting ($rootScope, $state) {

		$rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {

		 	if (error === "AUTH_REQUIRED") {

				$state.go("login");
		  	}
		});
	};


})();