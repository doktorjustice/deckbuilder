(function () {

	'use strict';

	angular
		.module('appCore')
		.controller('LoginCtrl', LoginCtrl)


	LoginCtrl.$inject = ['authService'];


	function LoginCtrl (authService) {

		var vm = this;
		vm.auth = authService;
		vm.form = {};

	}

})();