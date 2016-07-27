(function(){
    'use strict';

    angular
        .module('claim')
        .service('ClaimService',ClaimService);
    ClaimService.$inject = ['$q','$http','fruitpay'] ;
    function ClaimService($q,$http,fruitpay){
      var order = null;
      var cachePageOrders = null;
      var searchTime = null;
      
      this.findAll = function(page,size,condition) {
        if(condition.validFlag == null || condition.validFlag == undefined)
          condition.validFlag = 1;
        var url = fruitpay+'customerDataCtrl/customerClaim?page='+page+'&size='+size;
        if(condition.validFlag >= 0){
          url += '&validFlag='+condition.validFlag;
        }
        if(condition.orderId){
          url += '&orderId='+condition.orderId;
        }
        if(condition.email){
          url += '&email='+condition.email;
        }
        if(condition.name){
          url += '&name='+condition.name;
        }
        if(condition.startDate){
          url += '&startDate='+condition.startDate;
        }
        if(condition.endDate){
          url += '&endDate='+condition.endDate;
        }
        if(condition.receiverCellphone){
          url += '&receiverCellphone='+condition.receiverCellphone;
        }
        return $q(function(resolve, reject){
             $http.get(url)
          .then(function(res){
            resolve(res);
          });
        });
      }
    
    this.update = function(customerClaim){
      return $q(function(resolve, reject){
        $http.put(fruitpay+'customerDataCtrl/customerClaim', customerClaim)
          .then(function(res){
            resolve(res);
          });
        });
      }
    
    this.add = function(customerClaim){
      return $q(function(resolve, reject){
        $http.post(fruitpay+'customerDataCtrl/customerClaim', customerClaim)
          .then(function(res){
            resolve(res);
          });
        });
      }

    } 
})();