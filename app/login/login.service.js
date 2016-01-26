(function(){
    'use strict';

    angular
        .module('login')
        .service('LoginService', LoginService);
    LoginService.$inject = ['$filter','$q','$http','fruitpay'] ;
    function LoginService($filter, $q, $http, fruitpay){
		
    	this.login = function(manager){
            return $q(function(resolve, reject){
        		$http.post(fruitpay+'customerDataCtrl/login', manager)
        		.then(function(res){
        			resolve(res);
        		});
            });
    	}
    }

})();