(function(){
    'use strict';

    angular
        .module('shipment')
        .service('ShipmetService',ShipmetService);
    ShipmetService.$inject = ['$filter','$q','$http','fruitpay'] ;
    function ShipmetService($filter,$q,$http,fruitpay){
    	this.findAll = function(page,size){
            return $q(function(resolve, reject){
        		$http.get(fruitpay+'shipmentCtrl/shipmentChange?page='+page+'&size='+size)
					.then(function(res){
						resolve(res);
					});
            });
    	}
    }

})();