(function(){
    'use strict';

    angular
        .module('util')
        .service('UtilService',UtilService);
    UtilService.$inject = ['$q','$http','fruitpay'] ;
    function UtilService($q,$http,fruitpay){
    	this.getAllPostalCodes = function(){
            return $q(function(resolve, reject){
        		$http.get(fruitpay+'staticDataCtrl/getAllPostalCodes')
        		.then(function(res){
        			resolve(res);
        		});
            });
    	}
		
		this.getAllOrderStatus = function(){
            return $q(function(resolve, reject){
        		$http.get(fruitpay+'staticDataCtrl/orderStatuses')
        		.then(function(res){
        			resolve(res);
        		});
            });
    	}
		
		this.getAllProducts = function(){
            return $q(function(resolve, reject){
        		$http.get(fruitpay+'staticDataCtrl/getAllProducts')
        		.then(function(res){
        			resolve(res);
        		});
            });
    	}
		
		this.getAllOrderPlatforms = function(){
            return $q(function(resolve, reject){
        		$http.get(fruitpay+'staticDataCtrl/orderPlatforms')
        		.then(function(res){
        			resolve(res);
        		});
            });
    	}
		
		this.getAllShipmentPeriods = function(){
            return $q(function(resolve, reject){
        		$http.get(fruitpay+'staticDataCtrl/shipmentPeriods')
        		.then(function(res){
        			resolve(res);
        		});
            });
    	}
		
		this.getAllPaymentModes = function(){
            return $q(function(resolve, reject){
        		$http.get(fruitpay+'staticDataCtrl/paymentModes')
        		.then(function(res){
        			resolve(res);
        		});
            });
    	}
		
		this.getAllOrderPrograms = function(){
            return $q(function(resolve, reject){
        		$http.get(fruitpay+'staticDataCtrl/orderPrograms')
        		.then(function(res){
        			resolve(res);
        		});
            });
    	}
		
		this.getConstant = function(constantId){
            return $q(function(resolve, reject){
        		$http.get(fruitpay+'staticDataCtrl/adminConstant/' + constantId)
        		.then(function(res){
        			resolve(res);
        		});
            });
    	}
    }

})();