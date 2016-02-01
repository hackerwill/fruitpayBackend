(function(){
    'use strict';

    angular
        .module('coupon')
        .service('CouponService',CouponService);
    CouponService.$inject = ['$filter','$q','$http','fruitpay'] ;
    function CouponService($filter,$q,$http,fruitpay){
    	this.findAll = function(page,size){
            return $q(function(resolve, reject){
        		$http.get(fruitpay+'couponCtrl/coupons?page='+page+'&size='+size)
        		.then(function(res){
        			resolve(res);
        		});
            });
    	}
    	this.update = function(customer){
//            return $q(function(resolve, reject){
//        		$http.put(fruitpay+'customerDataCtrl/updateCustomer',customer)
//        		.then(function(res){
//        			resolve(res);
//        		});
//            });
    	}
    	this.createCustomer = function(customer){
//            return $q(function(resolve, reject){
//        		$http.post(fruitpay+'customerDataCtrl/addCustomer',customer)
//        		.then(function(res){
//        			resolve(res);
//        		});
//            });
    	}
    }

})();