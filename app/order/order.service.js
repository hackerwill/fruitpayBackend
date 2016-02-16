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
			return $q(function(resolve, reject){
        		$http.put(fruitpay+'orderCtrl/order', order)
					.then(function(res){
						resolve(res);
					});
            });
    	}
		
		this.createOrder = function(order){
			var sendObj = {};
			sendObj.customerOrder = order;
			sendObj.customer = order.customer;
			return $q(function(resolve, reject){
        		$http.post(fruitpay+'orderCtrl/order', sendObj)
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