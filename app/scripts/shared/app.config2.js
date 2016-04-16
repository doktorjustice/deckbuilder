(function() {

	'use strict';

	angular
		.module('appCore')
		.config(routeConfig)
		.config(fbRef)
		.constant('FirebaseUrl', 'https://hsdeck.firebaseio.com/');


	routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

	fbRef.$inject = ['$firebaseRefProvider', 'FirebaseUrl'];


	function routeConfig($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/dashboard');

		$stateProvider
		.state('app', {
			abstract: true,
			url: '',
			resolve: {
				userData: function () {

					return 'userData comes here';
				}
			},
			views: {
				navigation: {
					templateUrl: 'templates/navigation.html',
					controller: 'NavigationController',
					controllerAs: 'navigation'
				},
				content: {
					template: '<ui-view></ui-view>',
				}
			}
		})
		.state('app.dashboard', {
			url: '/dashboard',
			templateUrl: 'templates/dashboard.html',
			controller: 'DashboardCtrl',
			controllerAs: 'dashboard'
		})
	}


	function fbRef ($firebaseRefProvider, FirebaseUrl) {

	    $firebaseRefProvider.registerUrl({
	        default: FirebaseUrl,
	        decks: FirebaseUrl + 'decks',
	        users: FirebaseUrl + 'users',
	    });
	}


})();