(function(){
    'use strict';

    angular
        .module('login')
        .controller('LoginController',LoginController);
    LoginController.$inject = ['$scope','AuthenticationService','$mdDialog'];
    
	function LoginController($scope,LoginService,$mdDialog){
        var vm = this ;	//view model
		$scope.manager = {};
		$scope.loginBtnClick = function(){
			if(!$scope.manager.managerId || !$scope.manager.password)
				return;
			
			AuthenticationService.login($scope.manager)
				.then(function(){
					console.log(111);
				});
		}
    }
    
})();