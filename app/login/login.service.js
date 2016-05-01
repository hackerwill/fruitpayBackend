(function(){
    'use strict';

    angular
        .module('login')
        .service('LoginService', LoginService);
    LoginService.$inject = ['$filter','$q','$http','fruitpay', '$mdDialog', 'LogService'] ;
    function LoginService($filter, $q, $http, fruitpay, $mdDialog, LogService){
		
    	this.login = function(manager){
            return $q(function(resolve, reject){
        		$http.post(fruitpay+'loginCtrl/login', manager)
					.then(
						function(res){
							resolve(res.data);
						},
						function(error){
							console.log(error);
							LogService.showError(error);
						});
            });
    	}
		
		this.validate = function(manager){
            return $q(function(resolve, reject){
        		$http.post(fruitpay+'loginCtrl/validateToken', manager)
					.then(
						function(res){
							resolve(res.data);
						},
						function(error){
							console.log(error);
							LogService.showError(error);
						});
            });
    	}
		
		this.logout = function(){
            return $q(function(resolve, reject){
        		$http.post(fruitpay+'loginCtrl/logout')
					.then(
						function(res){
							resolve(res.data);
						},
						function(error){
							console.log(error);
							LogService.showError(error);
						});
            });
    	}
    }

})();