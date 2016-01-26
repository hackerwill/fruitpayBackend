(function() {
    'use strict';

    angular
        .module('customer')
        .config(Config);

    Config.$inject = ['$routeProvider']

    function Config($routeProvider) {
        $routeProvider.
            when('/customers',{
				templateUrl: 'app/customer/customers.html',
				controller:'CustomersController as vm'
			}).
			when('/customers/:customerId',{
				templateUrl: 'app/customer/customer.html',
				controller:'CustomerController as vm'
			});
    }
})();