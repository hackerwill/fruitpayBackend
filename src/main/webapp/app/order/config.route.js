(function() {
    'use strict';

    angular
        .module('order')
        .config(Config);

    Config.$inject = ['$routeProvider']

    function Config($routeProvider) {
        $routeProvider.
            when('/orders',{
            templateUrl: 'app/order/orders.html',
            controller:'OrdersController as vm'
        }).
        when('/orders/:orderId',{
            templateUrl: 'app/order/order.html',
            controller:'OrderController as vm'
        });
    }
})();