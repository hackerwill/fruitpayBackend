(function() {
    'use strict';

    angular
        .module('constant')
        .config(Config);

    Config.$inject = ['$routeProvider']

    function Config($routeProvider) {
        $routeProvider.
            when('/constants',{
              templateUrl: 'app/constant/constants.html',
              controller:'ConstantsController as vm'
            })
            .when('/constantOptions/',{
              templateUrl: 'app/constant/constantOptions.html',
              controller:'ConstantsController as vm'
            });
    }
})();