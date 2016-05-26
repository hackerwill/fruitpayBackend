(function(){
  'use strict';

  angular
    .module('constant')
    .service('ConstantService',ConstantService);

  ConstantService.$inject = ['$http','fruitpay'];

  function ConstantService($http, fruitpay) {
    this.getAllAdminConstants = function(page, size) {
      return $http.get(fruitpay+'staticDataCtrl/adminConstant?page='+page+'&size='+size);
    }

    this.getAdminConstantByConstId = function(constId) {
      return $http.get(fruitpay+'staticDataCtrl/adminConstant/'+constId);
    }

    this.updateConstant = function(constant) {
      return $http.put(fruitpay+'staticDataCtrl/adminConstant',constant);
    }

    this.createConstant = function(constant) {
      return $http.post(fruitpay+'staticDataCtrl/adminConstant',constant);
    }

    this.getAllConstantOptionsByConstId = function (page, size, constId) {
      return $http.get(fruitpay+'staticDataCtrl/adminConstantOption/'+constId+'/?page='+page+'&size='+size);
    }

    this.updateConstantOption = function(constantOption) {
      return $http.put(fruitpay+'staticDataCtrl/adminConstant/constOption',constantOption);
    }

    this.createConstantOption = function(constantOption) {
      return $http.post(fruitpay+'staticDataCtrl/adminConstant/constOption',constantOption);
    }
  }

})();