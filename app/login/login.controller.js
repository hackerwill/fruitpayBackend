(function(){
    'use strict';

    angular
    	.module('login')
    	.controller('LoginController',LoginController);
    LoginController.$inject = ['$scope', '$rootScope', 'LoginService', 'AuthenticationService','$mdDialog', '$location'];
	
	function LoginController($scope, $rootScope, LoginService, AuthenticationService, $mdDialog, $location){
        var vm = this ;	//view model
		$scope.manager = {};
		$scope.loginBtnClick = loginBtnClick;
		
		function loginBtnClick(){
			if(!$scope.manager.email || !$scope.manager.password)
				return;
			
			AuthenticationService.login($scope.manager)
				.then(function(result){
					if(result){
						if($rootScope.previousState)
							$location.path( $rootScope.previousState.originalPath);
						else
							$location.path("/customers");
					}
				});
		}
    }
    
})();