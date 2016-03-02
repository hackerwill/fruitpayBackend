(function(){
    'use strict';

    angular
        .module('login')
        .controller('LogoutController',LogoutController);
    LogoutController.$inject = ['$scope', 'LoginService', 'AuthenticationService', '$location'];
	
	function LogoutController($scope, LoginService, AuthenticationService, $location){
        console.log(1);
		
		AuthenticationService.clearCredentials()
			.then(function(result){
				$location.path("/login");
			});
		
    }
    
})();