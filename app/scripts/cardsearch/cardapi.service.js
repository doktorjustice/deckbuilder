(function () {

	'use strict';

	
	angular
		.module('cards')
		.factory('cardApi', cardApi)
		

	cardApi.$inject = ['$http', '$q'];


	function cardApi ($http, $q) {
	    
	    var baseURL = "https://omgvamp-hearthstone-v1.p.mashape.com/",
	    	headers = {'X-Mashape-Key': "D94SomjgvWmshNYKwkSCY7SDlQyVp1BA1i5jsnvOD76f0PaOxG"},
	    	url = '',
	    	params = {
	        	collectible: 1,
	    	};


	    return {
	        getGeneralInfo: getGeneralInfo,
	        getCardsByClass: getCardsByClass,
	        getCardsByType: getCardsByType,
	        getAllCards: getAllCards
	    };



	    function getGeneralInfo () {

	        url = baseURL + "info";

	        return $http({
	            method: "GET",
	            url: url,
	            headers: headers,
	        })   
	    };


	    function getCardsByClass (playerClass) {

	        url = baseURL + "cards/classes/" + playerClass; 
	        
	        return $http({
	            method: "GET",
	            url: url,
	            headers: headers,
	            params: params
	        })   
	    }


	    function getCardsByType (type) {

	    	url = baseURL + "cards/types/" + type;
	    	
	    	return $http({
	    	    method: "GET",
	    	    url: url,
	    	    headers: headers,
	    	    params: params
	    	}) 
	    }


	    function getAllCards (array) {

	    	return $q.all(array.map(getCardsByClass));
	    }
	};

})();