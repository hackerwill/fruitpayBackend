(function() {
    'use strict';

    angular
        .module('mdTable')
        .config(Config);

    Config.$inject = ['$routeProvider']

    function Config($routeProvider) {
        $routeProvider.
            when('/mdTable',{
            templateUrl: 'app/mdTable/mdTable.html',
            controller:'MdTableController as vm'
        });
    }
})();