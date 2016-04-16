(function () {

    'use strict';


    angular.module('hearthstoneApp', [

        // Core module
        'appCore',

        // Feature modules
        'cards',
        'deckBuilder',
        'deckStats',]
    );
    
    
    angular.module('appCore', ['ngRoute','firebase', 'ui.router']);

    angular.module('cards', []);

    angular.module('deckBuilder', []); 

    angular.module('deckStats', ['googlechart']);
    
})();