(function(){
    'use strict';

    angular
        .module('shipment')
        .service('ShipmentService',ShipmentService);
    ShipmentService.$inject = ['$filter','$q','$http','fruitpay'] ;
    function ShipmentService($filter,$q,$http,fruitpay){
    	this.findAll = function(page,size){
            return $q(function(resolve, reject){
        		$http.get(fruitpay+'shipmentCtrl/shipmentChange?page='+page+'&size='+size)
					.then(function(res){
						resolve(res);
					});
            });
    	}

        this.shipmentPreview = function(page,size, condition){

            var url = fruitpay+'shipmentCtrl/shipmentPreview?page='+page+'&size='+size;

            if(condition.date){
                url = url + "&date=" + condition.date;
            }

            return $q(function(resolve, reject){
                $http.get(url)
                    .then(function(res){
                        resolve(res);
                    });
            });
        }

        this.exportShipments = function(orderIds, condition){
          if(!condition){
            condition = {};
          }
          if(condition.validFlag == null || condition.validFlag == undefined)
              condition.validFlag = 1;
          
            var url = fruitpay+'shipmentCtrl/exportShipments'

            if(condition.date){
                url = url + "?date=" + condition.date;
            }
            
            return $q(function(resolve, reject){
              var d = new Date();
              var filename = "shipment_" + d.getTime() + ".xls"
              $http.defaults.headers.post["fileName"]=filename;       
                  $http.post(url, orderIds, {responseType: 'arraybuffer'})
                .then(function (response) {         
                    resolve(response);
                });   
            });
        }
    }

})();