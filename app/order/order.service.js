(function(){
    'use strict';

    angular
        .module('order')
        .service('OrderService',OrderService);
    OrderService.$inject = ['$q','$http','fruitpay'] ;
    function OrderService($q,$http,fruitpay){
    	this.findAll = function(page,size,condition){
    		if(condition.validFlag == null || condition.validFlag == undefined)
    			condition.validFlag = 1;
    		var url = fruitpay+'orderCtrl/orders?page='+page+'&size='+size;
    		if(condition.validFlag >= 0){
    			url += '&validFlag='+condition.validFlag;
    		}
    		if(condition.orderId){
    			url += '&orderId='+condition.orderId;
    		}
    		if(condition.name){
    			url += '&name='+condition.name;
    		}
    		if(condition.allowForeignFruits){
    			url += '&allowForeignFruits='+condition.allowForeignFruits;
    		}
    		if(condition.startDate){
    			url += '&startDate='+condition.startDate;
    		}
    		if(condition.endDate){
    			url += '&endDate='+condition.endDate;
    		}

            return $q(function(resolve, reject){
        		$http.get(url)
					.then(function(res){
						resolve(res);
					});
            });
    	}

    	this.moveOrders = function(orders, validFlag){
    		var url = fruitpay + (validFlag == 1 ? 'orderCtrl/trash' : 'orderCtrl/recover');
			return $q(function(resolve, reject){
        		$http({
				  method: 'put',
				  url: url,
				  data : orders,
				  headers: {"Content-Type": "application/json;charset=utf-8"}
				}).then(function(res){
						resolve(res);
				});
            });
		}
		
		this.deleteOrders = function(orders){
			return $q(function(resolve, reject){
        		$http({
				  method: 'delete',
				  url: fruitpay+'orderCtrl/orders',
				  data : orders,
				  headers: {"Content-Type": "application/json;charset=utf-8"}
				}).then(function(res){
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
		
		this.exportOrders = function(orders){		
            return $q(function(resolve, reject){
				var d = new Date();
				var filename = "order_" + d.getTime() + ".xls"
				$http.defaults.headers.post["fileName"]=filename;				
        		$http.post(fruitpay+'orderCtrl/exportOrders', orders,{responseType: 'arraybuffer'})
					.then(function (response) {	
                            console.log(response);					
							resolve(response);
					
					});		
            });
    	}
    }	
})();