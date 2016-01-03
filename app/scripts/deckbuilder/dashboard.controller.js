'use strict';

(function () {


	angular
		.module('Deckbuilder')
		.controller('DashboardCtrl', DashboardCtrl)


	DashboardCtrl.$inject = ['deckData']


	function DashboardCtrl (deckData) {

	    var vm = this;
	    vm.deckData = deckData;

	}

})();