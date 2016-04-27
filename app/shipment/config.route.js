(function() {
    'use strict';

    angular
        .module('shipment')
        .config(Config);

    Config.$inject = ['$routeProvider']

    function Config($routeProvider) {
        $routeProvider.
            when('/shipment/change',{
            templateUrl: 'app/shipment/shipmentChange.html',
            controller:'ShipmentChangeController as vm'
        });
    }
})();