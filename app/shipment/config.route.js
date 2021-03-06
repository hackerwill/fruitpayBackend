(function() {
    'use strict';

    angular
        .module('shipment')
        .config(Config);

    Config.$inject = ['$routeProvider']

    function Config($routeProvider) {
        $routeProvider
            .when('/shipment/change',{
                templateUrl: 'app/shipment/shipmentChangeView.html',
                controller:'ShipmentChangeViewController as vm'
            })
            .when('/shipment/shipmentPreview',{
                templateUrl: 'app/shipment/shipmentPreview.html',
                controller:'ShipmentPreviewController as vm'
            })
            .when('/shipment/shipmentRecord',{
                templateUrl: 'app/shipment/shipmentRecord.html',
                controller:'ShipmentRecordController as vm'
            })
            .when('/shipment/shipmentPreferences',{
                templateUrl: 'app/shipment/shipmentPreferences.html',
                controller:'ShipmentPreferencesController as vm'
            });
    }
})();