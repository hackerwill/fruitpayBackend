(function() {
    'use strict';

    angular
        .module('coupon')
        .config(Config);

    Config.$inject = ['$routeProvider']

    function Config($routeProvider) {
        $routeProvider.
            when('/coupons',{
            templateUrl: 'app/coupon/coupons.html',
            controller:'CouponsController as vm'
        });
    }
})();