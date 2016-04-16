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


	function routeConfig($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/dashboard');

		$stateProvider
		.state('app', {
			abstract: true,
			url: '',
			resolve: {
				userData: function ($firebaseAuthService, authService) {

					return $firebaseAuthService.$requireAuth()
				    .then(function (user) {

				        return authService.getUser(user.uid);
				    });
				},
				path: function ($location) {

					return $location.path();
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
		.state('login', {
			url: '/login',
			views: {
				navigation: {
					templateUrl: 'templates/navigation.html',
					// controller: 'NavigationController',
					// controllerAs: 'navigation'
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