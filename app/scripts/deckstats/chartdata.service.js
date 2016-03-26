(function() {

	'use strict';

	angular
		.module('deckBuilder')
		.factory('chartData', chartData)


	chartData.$inject = ['googleChartApiPromise'];


	function chartData (googleChartApiPromise) {

		return {

			setChartObject: setChartObject,
		}


		function setChartObject (deck) {

			var chartData = {};

			return googleChartApiPromise.then(function() {

				if (deck.stats) {
					
					chartData.mana = defineChartObject(deck.stats.mana, 'Mana', 'ColumnChart');
					chartData.type = defineChartObject(deck.stats.type, 'Types', 'PieChart');
					chartData.gems = defineChartObject(deck.stats.gems, 'Rarity', 'PieChart');
					chartData.abilities = defineChartObject(deck.stats.abilities, 'Special Abilities', 'BarChart');
				}

				return chartData;
			});
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

			var sort = (type === 'BarChart');

			try {

				chartObject.data = prepareDataTable(data,sort);	
			
			} catch(e) {

				console.error(e + title);

				return {};

			}
			
			return chartObject;
		}


		function prepareDataTable (data, sort) {

			var dataArray = [],
				dataTable;

			angular.forEach(data, function (value, key) {

				var row = [key, value];

				dataArray.push(row);
			})

			if (dataArray.length > 0) {

				dataTable = google.visualization.arrayToDataTable(dataArray, true);

				if (sort) dataTable.sort({column: 1, desc: true});

				return dataTable;

			} else {

				throw new Error('No data for this chart: ');
			}
		}
	}

})();