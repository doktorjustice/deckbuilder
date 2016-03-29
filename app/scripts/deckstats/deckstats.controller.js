(function () {

	'use strict';

	angular
		.module('deckBuilder')
		.controller('StatsOverviewCtrl', StatsOverviewCtrl)

	
	StatsOverviewCtrl.$inject = ['$scope', 'deckData', 'chartData']


	function StatsOverviewCtrl ($scope, deckData, chartData) {

	    var vm = this;
	    vm.deckData = deckData;
	    vm.chart = {};


	    $scope.$watch('stats.deckData.currentDeck.$id', function () {

	    	chartData.getDataForCharts(deckData.currentDeck);
	    });
   
	}

})();