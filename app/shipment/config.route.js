(function() {
    'use strict';

    angular
        .module('shipment')
        .config(Config);

    Config.$inject = ['$routeProvider']

    function Config($routeProvider) {
        $routeProvider.
            when('/shipment/change',{
            templateUrl: 'app/shipment/shipmentChangeView.html',
            controller:'ShipmentChangeViewController as vm'
        });
    }
})();