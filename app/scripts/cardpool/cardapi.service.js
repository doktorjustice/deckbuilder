'use strict';

/**
 * Inreract with Hearthstone card API.
 * @return {none} 
 */
(function () {

	
	angular
		.module('Cardpool')
		.factory('cardApiService', cardApiService)
		

	cardApiService.$inject = ['$http'];


	function cardApiService ($http) {
	    
	    var baseURL = "https://omgvamp-hearthstone-v1.p.mashape.com/"
	    var headers = {'X-Mashape-Key': "D94SomjgvWmshNYKwkSCY7SDlQyVp1BA1i5jsnvOD76f0PaOxG"};
	    var url = '';
	    var params = {
	        collectible: 1,
	    }


	    var getGeneralInfo = function () {

	        url = baseURL + "info";

	        return $http({
	            method: "GET",
	            url: url,
	            headers: headers,
	        })   
	    };


	    var getCardsByClass = function (playerClass) {

	        url = baseURL + "cards/classes/" + playerClass; 
	        
	        return $http({
	            method: "GET",
	            url: url,
	            headers: headers,
	            params: params
	        })   
	    }

	    var getCardsByType = function (type) {

	    	url = baseURL + "cards/types/" + type;
	    	
	    	return $http({
	    	    method: "GET",
	    	    url: url,
	    	    headers: headers,
	    	    params: params
	    	}) 
	    }

	    var getAllCards  = function() {

	        url = baseURL + "cards";

	        return $http({
	            method: "GET",
	            url: url,
	            headers: headers,
	            params: params
	        }) 
	    }


	    return {
	        getGeneralInfo: getGeneralInfo,
	        getCardsByClass: getCardsByClass,
	        getCardsByType: getCardsByType,
	        getAllCards: getAllCards
	    };

	};

})();