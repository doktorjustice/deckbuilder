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

	    	return getDataForCharts(deckData.currentDeck);
	    });


	    function getDataForCharts (deck) {

	    	chartData.setChartObject(deck)
	    	.then(function(chartObject) {

	    		deckData.currentDeck.chartData = chartObject;
	    	})
	    }
	}

})();