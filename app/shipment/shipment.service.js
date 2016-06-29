(function(){
    'use strict';

    angular
        .module('shipment')
        .service('ShipmentService',ShipmentService);
    ShipmentService.$inject = ['$filter','$q','$http','fruitpay'] ;
    function ShipmentService($filter,$q,$http,fruitpay){
    	this.findAll = function(page, size, condition){
        var url = fruitpay+'shipmentCtrl/shipmentChange?page='+page+'&size='+size;

        if(condition.deliverStartDate){
          url += '&deliverStartDate='+condition.deliverStartDate;
        }
        if(condition.deliverEndDate){
          url += '&deliverEndDate='+condition.deliverEndDate;
        }
        if(condition.updateStartDate){
          url += '&updateStartDate='+condition.updateStartDate;
        }
        if(condition.updateEndDate){
          url += '&updateEndDate='+condition.updateEndDate;
        }
        if(condition.receiverCellphone){
          url += '&receiverCellphone='+condition.receiverCellphone;
        }
        if(condition.orderId){
          url += '&orderId='+condition.orderId;
        }
        if(condition.name){
          url += '&name='+condition.name;
        }
        if(condition.validFlag >= 0){
          url += '&validFlag='+condition.validFlag;
        }

        return $q(function(resolve, reject){
        	$http.get(url)
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

          if(condition.forceUpdate){
              url = url + "&forceUpdate=" + condition.forceUpdate;
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

      this.exportShipmentChanges = function(shipmentChanges, condition){
        console.log(shipmentChanges)
        console.log(condition)
        if(!condition){
          condition = {};
        }
        
        var url = fruitpay+'shipmentCtrl/exportShipmentChanges?test=none'
       
        if(condition.deliverStartDate){
          url += '&deliverStartDate='+condition.deliverStartDate;
        }
        if(condition.deliverEndDate){
          url += '&deliverEndDate='+condition.deliverEndDate;
        }
        if(condition.updateStartDate){
          url += '&updateStartDate='+condition.updateStartDate;
        }
        if(condition.updateEndDate){
          url += '&updateEndDate='+condition.updateEndDate;
        }
        return $q(function(resolve, reject) {
          var d = new Date();
          var filename = "shipmentRecord_" + d.getTime() + ".xls"
          $http.defaults.headers.post["fileName"]=filename;       
          $http.post(url, shipmentChanges, {responseType: 'arraybuffer'})
            .then(function (response) {         
              resolve(response);
            });   
          });
      }

      this.findInitFruitPreferences = function(condition){
        if(!condition.date || !condition.selectedProdudctItems || !condition.selectedProdudctItems.length) {
          return;
        }

        var categoryItemIdsStr = [];
        for(var i = 0; i < condition.selectedProdudctItems.length; i ++) {
          categoryItemIdsStr.push(condition.selectedProdudctItems[i].categoryItemId);
        }
        categoryItemIdsStr = categoryItemIdsStr.join(',')

        var url = fruitpay+'shipmentCtrl/shipmentPreference?date='+condition.date+'&categoryItemIdsStr='+categoryItemIdsStr;

        return $q(function(resolve, reject){
          $http.get(url)
            .then(function(res){
              resolve(res);
            });
          });
      }

      this.shipmentPreferenceCalculate = function(condition, shipmentPreferenceBean){
        if(!condition.selectedProdudctItems || !condition.selectedProdudctItems.length || !shipmentPreferenceBean) {
          return;
        }

        var categoryItemIdsStr = [];
        for(var i = 0; i < condition.selectedProdudctItems.length; i ++) {
          categoryItemIdsStr.push(condition.selectedProdudctItems[i].categoryItemId);
        }
        categoryItemIdsStr = categoryItemIdsStr.join(',')

        var url = fruitpay+'shipmentCtrl/shipmentPreferenceCalculate?categoryItemIdsStr=' + categoryItemIdsStr;

        return $q(function(resolve, reject){
          $http.post(url, shipmentPreferenceBean)
            .then(function(res){
              resolve(res);
            });
          });
      }

      this.shipmentDisplayRecord = function(page, size, date){

          var url = fruitpay+'shipmentCtrl/shipmentDisplayRecord';

          return $q(function(resolve, reject){
              $http.get(url)
                  .then(function(res){
                      resolve(res);
                  });
          });
      }


    }

})();