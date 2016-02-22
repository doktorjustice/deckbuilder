'use strict';

(function () {


	angular
		.module('deckStats')
		.controller('StatsOverviewCtrl', StatsOverviewCtrl)

	
	StatsOverviewCtrl.$inject = ['$scope', 'deckData','googleChartApiPromise']


	function StatsOverviewCtrl ($scope, deckData, googleChartApiPromise) {

	    var vm = this;
	    vm.deckData = deckData;


	    //Wait for Google Chart API to load then prepare chart data and attach $watch on currentDeck
	    googleChartApiPromise.then(function() {

	    	setChartObject();

	    	//Ugly solution of letting controller know that currentDeck was changed by user
	    	$scope.$watch('stats.deckData.currentDeck.$id', setChartObject);
	    });


	    function setChartObject () {

	    	vm.manaData = defineChartObject(vm.deckData.currentDeck.stats.mana, 'Mana', 'ColumnChart');
	    	vm.typeData = defineChartObject(vm.deckData.currentDeck.stats.type, 'Types', 'PieChart');
	    	vm.gemData = defineChartObject(vm.deckData.currentDeck.stats.gems, 'Rarity', 'PieChart');
	    	vm.abilities = defineChartObject(vm.deckData.currentDeck.stats.abilities, 'Special Abilities', 'BarChart');
	    }


	    function defineChartObject (data, title, type) {

	    	var chartObject = {};

	    	chartObject.type = type;

	    	chartObject.options = {

	    		title: title,
	    		titleTextStyle: {
	    			fontSize: 20,
	    		},
	    		legend: 'none',
	    		height: 300,
	    		enableInteractivity: true,
	    		pieSliceText: 'label',
	    		vAxis: {
	    			direction: 1,
	    		},
	    	};

	    	var sort = (type == 'BarChart');

	    	chartObject.data = prepareDataTable(data,sort);

	    	return chartObject;
	    }
	    

	    function prepareDataTable (data, sort) {

	    	var dataArray = [];

	    	angular.forEach(data, function (value, key) {

	    		var row = [key, value];

	  			dataArray.push(row);
	    	})

	    	var dataTable = google.visualization.arrayToDataTable(dataArray, true);

	    	if (sort) dataTable.sort({column: 1, desc: true});

	    	return dataTable;
	    }
	}

})();