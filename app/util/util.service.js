(function(){
    'use strict';

    angular
        .module('util')
        .service('UtilService',UtilService);
    UtilService.$inject = ['$q','$http','fruitpay'] ;
    function UtilService($q,$http,fruitpay){
    	var allPostalCodes;
        var allOrderStatus;
        var allProducts;
        var allOrderPlatforms;
        var allShipmentPeriods;
        var allPaymentModes;
        var allOrderPrograms;


        this.getAllPostalCodes = function(){
            return $q(function(resolve, reject){
              if(!allPostalCodes){
                $http
                  .get(fruitpay+'staticDataCtrl/getAllPostalCodes')
                  .then(function(res){
                    allPostalCodes = res;
                    resolve(allPostalCodes);
                  });
              }else{
                resolve(allPostalCodes);
              }
            });
    	}
		
		this.getAllOrderStatus = function(){
            return $q(function(resolve, reject){
              if(!allOrderStatus){
                $http.get(fruitpay+'staticDataCtrl/orderStatuses')
                .then(function(res){
                  allOrderStatus = res;
                  resolve(res);
                });
              }else{
                resolve(allOrderStatus);
              }
            });
    	}
		
		this.getAllProducts = function(){
            return $q(function(resolve, reject){
                if(!allProducts){
                  $http.get(fruitpay+'staticDataCtrl/getAllProducts')
                  .then(function(res){
                    allProducts = res;
                    resolve(res);
                  });
                }else{
                  resolve(allProducts);
                }
        		
            });
    	}
		
		this.getAllOrderPlatforms = function(){
            return $q(function(resolve, reject){
                if(!allOrderPlatforms){
                    $http.get(fruitpay+'staticDataCtrl/orderPlatforms')
                    .then(function(res){
                        allOrderPlatforms = res;
                        resolve(res);
                    });
                }else{
                  resolve(allOrderPlatforms);
                }
        		
            });
    	}
		
		this.getAllShipmentPeriods = function(){
            return $q(function(resolve, reject){
                if(!allShipmentPeriods){
                    $http.get(fruitpay+'staticDataCtrl/shipmentPeriods')
                    .then(function(res){
                        allShipmentPeriods = res;
                        resolve(res);
                    });
                }else{
                  resolve(allShipmentPeriods);
                }
        		
            });
    	}
		
		this.getAllPaymentModes = function(){
            return $q(function(resolve, reject){
                if(!allPaymentModes){
                    $http.get(fruitpay+'staticDataCtrl/paymentModes')
                    .then(function(res){
                        allPaymentModes = res;
                        resolve(res);
                    });
                }else{
                  resolve(allPaymentModes);
                }
        		
            });
    	}
		
		this.getAllOrderPrograms = function(){
            return $q(function(resolve, reject){
                if(!allOrderPrograms){
                    $http.get(fruitpay+'staticDataCtrl/orderPrograms')
                    .then(function(res){
                        allOrderPrograms = res;
                        resolve(res);
                    });
                }else{
                  resolve(allOrderPrograms);
                }
        		
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