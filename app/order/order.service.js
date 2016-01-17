(function(){
    'use strict';

    angular
        .module('order')
        .service('OrderService',OrderService);
    OrderService.$inject = ['$q','$http','fruitpay'] ;
    function OrderService($q,$http,fruitpay){
    	this.findAll = function(page,size){
            return $q(function(resolve, reject){
        		$http.post(fruitpay+'orderCtrl/getOrders?page='+page+'&size='+size)
        		.then(function(res){
        			resolve(res);
        		});
            });
    	}
    }

})();