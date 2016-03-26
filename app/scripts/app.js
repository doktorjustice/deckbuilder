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
    
    
    angular.module('appCore', ['ngRoute']);

    angular.module('cards', []);

    angular.module('deckBuilder', ['firebase']); 

    angular.module('deckStats', ['googlechart']);
    
})();