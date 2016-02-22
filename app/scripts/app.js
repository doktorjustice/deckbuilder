'use strict';

(function () {

    angular.module('hearthstoneApp', [

        // Core module
        'AppCore',

        // Feature modules
        'Cards',
        'Deckbuilder',
        'deckStats',]
    );
    
    
    angular.module('AppCore', ['ngRoute']);

    angular.module('Cards', []);

    angular.module('Deckbuilder', ['firebase']); 

    angular.module('deckStats', ['googlechart']);
    
})();