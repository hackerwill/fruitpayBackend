(function(){
    'use strict';

    angular
        .module('customer')
        .service('CustomerService',CustomerService);
    CustomerService.$inject = ['$filter','$q','$http','fruitpay'] ;
    function CustomerService($filter,$q,$http,fruitpay){
    	this.findAll = function(){
            return $q(function(resolve, reject){
        		$http.post(fruitpay+'customerDataCtrl/customers')
        		.then(function(res){
        			resolve(res);
        		});
            });
    	}

    }

})();