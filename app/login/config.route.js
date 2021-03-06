(function() {
    'use strict';

    angular
        .module('login')
        .config(Config);

    Config.$inject = ['$routeProvider']

    function Config($routeProvider) {
        $routeProvider
			.when('/login',{
					templateUrl: 'app/login/login.html',
					controller:'LoginController as vm'
				})
			.when('/logout',{
					templateUrl: 'app/login/logout.html',
					controller:'LogoutController as vm'
				})	
    }
})();