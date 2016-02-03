(function(){
    'use strict';

    angular
        .module('login')
        .service('LoginService', LoginService);
    LoginService.$inject = ['$filter','$q','$http','fruitpay', '$mdDialog', 'LogService'] ;
    function LoginService($filter, $q, $http, fruitpay, $mdDialog, LogService){
		
    	this.login = function(manager){
            return $q(function(resolve, reject){
        		$http.post(fruitpay+'adminloginCtrl/login', manager)
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