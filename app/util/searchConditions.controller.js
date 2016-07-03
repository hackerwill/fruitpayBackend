(function() {
  'use strict';
  angular
    .module('order')
    .controller('SearchConditionsController', SearchConditionsController);

  SearchConditionsController.$inject = ['condition', 'conditionMap', '$mdDialog', 'UtilService', 'SEARCH_CONDITION'];

  function SearchConditionsController(condition, conditionMap, $mdDialog, UtilService, SEARCH_CONDITION) {
    var vm = this;
    vm.search = search;
    vm.clear = clear;
    vm.constants = {};
    vm.condition = angular.copy(condition);
    vm.conditionMap = angular.copy(conditionMap);
    vm.SEARCH_CONDITION = SEARCH_CONDITION;

    //得到異動原因
    UtilService.getConstant(14)
      .then(function(result){
        vm.constants.shipmentChangeReason = result.data;
      }), 

    UtilService.getAllOrderStatus()
      .then(function(result){
      console.log(result);
      vm.constants.orderStatuses = result.data;
    });

    UtilService.getAllProductItems()
      .then(function(result){
        console.log(result);
        vm.productItems = result.data;
      });

    function search() {
      $mdDialog.hide(vm.condition);
    }

    function clear() {
      vm.condition = {};
    }
  }
})();