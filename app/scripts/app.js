'use strict';

(function () {

    angular.module('hearthstoneApp', [

        // Core module
        'AppCore',

        // Feature modules
        'Cardpool',
        'Deckbuilder',
        'Deckstats',]
    );
    
    
    angular.module('AppCore', ['ngRoute']);

    angular.module('Cardpool', []);

    angular.module('Deckbuilder', ['firebase']); 

    angular.module('Deckstats', ['angular-chartist']);
    
})();
