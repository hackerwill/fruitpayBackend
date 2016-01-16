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
    }

})();