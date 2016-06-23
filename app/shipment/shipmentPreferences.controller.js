(function(){
  'use strict';
  angular
    .module('shipment')
    .controller('ShipmentPreferencesController', ShipmentPreferencesController);
  ShipmentPreferencesController.$inject = ['$window','OrderService', '$location' ,'ShipmentService', '$mdDialog', '$scope', '$q', 'FileSaverService', 'LogService', 'UtilService'] ;
  function ShipmentPreferencesController($window, OrderService, $location, ShipmentService, $mdDialog, $scope, $q, FileSaverService, LogService, UtilService){
    var vm = this ;  //view model
    vm.condition = {};
    vm.search = search;

    UtilService.getAllProductItems()
      .then(function(result){
        vm.productItems = result.data;
      });

    function search() {
      if(!vm.condition.date)
        return

      activate()
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

  }

})();








