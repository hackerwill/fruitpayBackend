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
		
		this.update = function(order){
			console.log(order);
			order.orderPreferences[0].likeDegree = 2;
            console.log(order);
			return $q(function(resolve, reject){
        		$http.put(fruitpay+'orderCtrl/order', order)
					.then(function(res){
						resolve(res);
					});
            });
    	}
		
		this.getAllNameStr = function(){
            return $q(function(resolve, reject){
        		$http({
					method: "POST", 
					url: fruitpay+'customerDataCtrl/customerNamesStr',
					transformResponse: undefined
				}).then(function(res){
        			resolve(res);
        		});
            });
    	}
		
		this.getCustomerByOrderId = function(orderId){
            return $q(function(resolve, reject){
				$http.post(fruitpay+'customerDataCtrl/customerByOrderId/' + orderId)
					.then(function(res){
						resolve(res);
					});
            });
    	}
		
    }

})();