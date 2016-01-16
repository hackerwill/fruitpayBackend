(function(){
    'use strict';

    angular
        .module('order')
        .service('OrderService',OrderService);
    OrderService.$inject = ['$q','$http','fruitpay'] ;
    function OrderService($q,$http,fruitpay){
    	this.findAll = function(){
            return $q(function(resolve, reject){
        		$http.post(fruitpay+'orderCtrl/getOrders')
        		.then(function(res){
        			resolve(res);
        		});
            });
    	}
    }

})();