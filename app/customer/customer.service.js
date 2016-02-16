(function(){
    'use strict';

    angular
        .module('customer')
        .service('CustomerService',CustomerService);
    CustomerService.$inject = ['$filter','$q','$http','fruitpay'] ;
    function CustomerService($filter,$q,$http,fruitpay){
    	this.findAll = function(page,size){
            return $q(function(resolve, reject){
        		$http.post(fruitpay+'customerDataCtrl/customers?page='+page+'&size='+size)
        		.then(function(res){
        			resolve(res);
        		});
            });
    	}
		this.findById = function(customerId){
			var customer ={};
			customer.customerId = customerId;
            return $q(function(resolve, reject){
        		$http.post(fruitpay+'customerDataCtrl/customers/id',customer)
        		.then(function(res){
        			resolve(res);
        		});
            });
    	}
    	this.update = function(customer){
            return $q(function(resolve, reject){
        		$http.put(fruitpay+'customerDataCtrl/updateCustomer',customer)
        		.then(function(res){
        			resolve(res);
        		});
            });
    	}
    	this.createCustomer = function(customer){
            return $q(function(resolve, reject){
        		$http.post(fruitpay+'customerDataCtrl/addCustomer',customer)
        		.then(function(res){
        			resolve(res);
        		});
            });
    	}
    }

})();