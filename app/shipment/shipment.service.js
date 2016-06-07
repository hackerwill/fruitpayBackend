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

        this.addShipmentRecord = function(date, orderIds){
          var url = fruitpay+'shipmentCtrl/shipmentRecord';

          var obj = {
            shipmentRecord: {
              date: date,
            },
            orderIds: orderIds,
          }

          return $q(function(resolve, reject){
            $http.post(url, obj)
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

        this.shipmentRecord = function(page, size, date){

            var url = fruitpay+'shipmentCtrl/shipmentRecord?page='+page+'&size='+size;

            if(date){
                url = url + "&date=" + date;
            }

            return $q(function(resolve, reject){
                $http.get(url)
                    .then(function(res){
                        resolve(res);
                    });
            });
        }

        this.shipmentRecordByDate = function(date){
            if(!date) {
              return
            }

            var url = fruitpay+'shipmentCtrl/shipmentRecord/date/' + date

            return $q(function(resolve, reject){
                $http.get(url)
                    .then(function(res){
                        resolve(res);
                    });
            });
        }

        this.invalidateShipmentRecord = function(shipmentRecord) {
          if(!shipmentRecord) {
            return
          }
          var url = fruitpay+'shipmentCtrl/shipmentRecord/invalidate';

          return $q(function(resolve, reject){
            $http.post(url, shipmentRecord)
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