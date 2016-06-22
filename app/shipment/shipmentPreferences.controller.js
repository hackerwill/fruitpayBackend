(function(){
  'use strict';
  angular
    .module('shipment')
    .controller('ShipmentPreferencesController', ShipmentPreferencesController);
  ShipmentPreferencesController.$inject = ['$window','OrderService', '$location' ,'ShipmentService', '$mdDialog', '$scope', '$q', 'FileSaverService', 'LogService', 'UtilService', 'SEARCH_CONDITION'] ;
  function ShipmentPreferencesController($window, OrderService, $location, ShipmentService, $mdDialog, $scope, $q, FileSaverService, LogService, UtilService, SEARCH_CONDITION){
    var vm = this ;  //view model
    vm.condition = {};
    vm.search = search;

    $scope.$emit('setSearchCallBack', onSearchClick);

    function search() {
      
    }

    function activate(){
      ShipmentService.findInitFruitPreferences(vm.condition)
        .then(function(result) {
          if(result && result.data) {
            vm.shipmentPreference = result.data;
            console.log(vm.shipmentPreference)
          }
        });
    }
    
    function onSearchClick($event) {
      var conditionMap ={};
      conditionMap[SEARCH_CONDITION.RECEIVE_DATE] = true,
      conditionMap[SEARCH_CONDITION.PRODUCTS] = true,
      
      $mdDialog.show({
        targetEvent: $event,
        hasBackdrop: true,
        clickOutsideToClose :true,
        locals: {
          condition: vm.condition,
          conditionMap: conditionMap,
        },
        templateUrl : 'app/util/searchConditions.html',
            controller:'SearchConditionsController as vm',
      }).then(function(res) {
        vm.condition = res;
        if(!vm.condition.date)
          return
        activate()
      });
    }
  }

})();








