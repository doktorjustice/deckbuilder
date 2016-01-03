'use strict';

(function () {


	angular
		.module('Deckstats')
		.controller('StatsOverviewCtrl', StatsOverviewCtrl)

	
	StatsOverviewCtrl.$inject = ['deckData']


	function StatsOverviewCtrl (deckData) {

	    var vm = this;
	    vm.deckData = deckData;
	    
	}

})();