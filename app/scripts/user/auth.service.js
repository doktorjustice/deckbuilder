(function () {

	'use strict';


	angular
		.module('appCore')
		.factory('authService', authService)


	authService.$inject = ['$location', '$q', '$firebaseAuthService', '$firebaseRef', '$firebaseObject', '$firebaseArray', 'FirebaseUrl'];


	function authService ($location, $q, $firebaseAuthService, $firebaseRef, $firebaseObject, $firebaseArray, FirebaseUrl) {

		var auth = $firebaseAuthService;
		var serviceObject = {};

		serviceObject.user = {};
		serviceObject.registerUser = registerUser;
		serviceObject.loginUser = loginUser;
		serviceObject.logoutUser = logoutUser;
		serviceObject.getUser = getUser;


		auth.$onAuth(function (newData) {
			
			$location.path('/');

		});

	
		return serviceObject;


		function getUser (uid) {

			var userRef = new Firebase(FirebaseUrl + '/users/' + uid);
			var deckRef = new Firebase(FirebaseUrl + '/users/' + uid + '/decks')
			var userData = $firebaseObject(userRef);
			var deckData = $firebaseArray(deckRef);

			return $q.all([userData.$loaded(), deckData.$loaded()]);
		}

		
		function loginUser (credentials) {

			auth.$authWithPassword(credentials)
			.catch(function (error) {

				console.error(error);
			});
		}


		function registerUser (credentials) {

			var users = $firebaseObject($firebaseRef.users);

			auth.$createUser(credentials)
			.then(function (data) {

				var date = new Date();

				users[data.uid] = {
					email: credentials.email,
					createdAt: date.getTime()
				}

				return users.$save();
			})
			.then(function (uid) {

				loginUser(credentials);
			})
			.catch(function (error) {

				console.error(error);
			})
		}


		function logoutUser () {

			auth.$unauth();
		}
	}

})();