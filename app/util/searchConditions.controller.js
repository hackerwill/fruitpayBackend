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

    UtilService.getAllOrderStatus()
      .then(function(result){
      console.log(result);
      vm.constants.orderStatuses = result.data;
    });


    UtilService.getAllProducts()
      .then(function(result){
        vm.products = result.data;
      });

    function search() {
      $mdDialog.hide(vm.condition);
    }

    function clear() {
      vm.condition = {};
    }
  }
})();