(function() {
    'use strict';

    angular
        .module('claim')
        .config(Config);

    Config.$inject = ['$routeProvider']

    function Config($routeProvider) {
        $routeProvider.
            when('/customerClaim',{
              templateUrl: 'app/claim/claim.html',
              controller:'ClaimController as vm'
            })
    }
})();